import { useEffect, useRef } from "react";

/**
 * Fullscreen GLSL field used behind the hero — domain-warped noise filaments
 * plus drifting glow, tinted with the Quantum palette.
 *
 * Deliberately dependency-free raw WebGL: no three.js, no models, ~4KB.
 * If the context can't be created the canvas simply stays empty and the CSS
 * background shows through, so nothing depends on it rendering.
 */

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;

uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_time;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.02;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
  vec2 m = (u_mouse - 0.5 * u_res) / u_res.y;
  float t = u_time * 0.06;

  // parallax toward the cursor, then warp the domain twice for filaments
  vec2 q = uv + m * 0.07;
  vec2 w = vec2(fbm(q * 1.6 + t), fbm(q * 1.6 + vec2(5.2, 1.3) - t));
  float f = fbm(q * 2.2 + w * 1.4 + vec2(0.0, t * 1.5));

  // thin bright thread along the ridge of the field, with a soft halo
  float ridge = abs(f - 0.5);
  float core = smoothstep(0.020, 0.0, ridge);
  float halo = smoothstep(0.09, 0.0, ridge) * 0.16;

  // large slow mask so the field breathes instead of filling the frame
  float mask = smoothstep(0.30, 0.72, fbm(q * 0.9 - t * 0.5));

  // two slow-drifting light volumes
  float g1 = exp(-3.5 * length(uv - vec2(-0.45 + 0.09 * sin(t * 3.0), 0.16)));
  float g2 = exp(-4.0 * length(uv - vec2(0.52 + 0.09 * cos(t * 2.3), -0.22)));

  vec3 pink = vec3(0.98, 0.26, 0.55);
  vec3 cyan = vec3(0.25, 0.79, 0.90);
  vec3 violet = vec3(0.55, 0.27, 0.94);

  // hue splits across the frame so pink and cyan are both always present —
  // summing them per-pixel would just desaturate to white
  vec3 tint = mix(pink, cyan, smoothstep(-0.45, 0.45, uv.x + 0.3 * sin(t * 0.7) + 0.4 * (f - 0.5)));

  // the hero copy lives left-of-centre, vertically middle — hold the field back
  // there so the wordmark and buttons always read cleanly
  float leftness = 1.0 - smoothstep(-0.55, 0.45, uv.x);
  float centreness = exp(-pow(uv.y / 0.34, 2.0));
  float textSafe = 1.0 - 0.62 * leftness * centreness;

  vec3 col = vec3(0.0);
  col += tint * (core * 0.55 + halo) * mask * textSafe;
  col += violet * (g1 * 0.24 + g2 * 0.20);
  col += cyan * g2 * 0.10;

  col += hash(gl_FragCoord.xy + fract(u_time)) * 0.018;
  col *= smoothstep(1.35, 0.2, length(uv));

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn("[ShaderField]", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function ShaderField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const opts = { alpha: false, antialias: false };
    const gl = (canvas.getContext("webgl2", opts) ??
      canvas.getContext("webgl", opts)) as WebGLRenderingContext | null;
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn("[ShaderField]", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // one oversized triangle covering the viewport
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "u_res");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uTime = gl.getUniformLocation(program, "u_time");

    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let raf = 0;
    let visible = true;

    const resize = () => {
      // capped DPR — the field is soft, so extra pixels buy nothing
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      mouse.x = target.x = canvas.width * 0.5;
      mouse.y = target.y = canvas.height * 0.5;
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const dpr = canvas.width / Math.max(1, r.width);
      target.x = (e.clientX - r.left) * dpr;
      target.y = (r.height - (e.clientY - r.top)) * dpr;
    };

    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      mouse.x += (target.x - mouse.x) * 0.045;
      mouse.y += (target.y - mouse.y) * 0.045;
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uTime, t * 0.001);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    resize();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      // one static frame — still atmospheric, no animation
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uTime, 12.0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    } else {
      raf = requestAnimationFrame(frame);
      window.addEventListener("pointermove", onMove, { passive: true });
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // stop drawing when the hero scrolls away or the tab is hidden
    const io = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting && !document.hidden;
    });
    io.observe(canvas);
    const onVisibility = () => {
      visible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      ro.disconnect();
      io.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full mix-blend-screen"
    />
  );
}
