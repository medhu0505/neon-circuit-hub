import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, Stars, useTexture } from "@react-three/drei";
import placeholder from "@/assets/team-placeholder.jpg";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { Group, Mesh, PerspectiveCamera } from "three";
import { team } from "@/lib/team";

/**
 * The signal corridor — one faceted Bat-emblem shard per team member, spaced
 * down the -Z corridor. Geometry is generated here (extruded emblem silhouette
 * plus orbiting graphite shards), so nothing about it is a stock crystal: dark
 * graphite bodies, moonlight-blue rim light and Bat-Signal white/amber
 * illumination on the active fragment.
 *
 * The scene reuses the project's existing R3F pipeline and render loop; scroll
 * progress arrives through refs so no per-frame React state is involved.
 */
export const CRYSTAL_SPACING = 26;
export const GATE_Z = -8;

const MOONLIGHT = "#8fd0ff";
const SIGNAL = "#ffd479";


/** Returns true when the browser can actually give us a WebGL context. */
export function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * The emblem is assembled from clean convex pieces — one extruded wing shape
 * (mirrored for the other side) plus a faceted core — so the silhouette reads
 * as a bat fragment instead of a stock crystal, and the triangulation stays
 * predictable.
 */
function useWingGeometry() {
  return useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0.34);
    s.lineTo(0.9, 0.5);
    s.lineTo(1.7, 0.34);
    s.lineTo(1.35, 0.02);
    s.lineTo(1.55, -0.3);
    s.lineTo(0.7, -0.34);
    s.lineTo(0.1, -0.55);
    s.closePath();
    const g = new THREE.ExtrudeGeometry(s, {
      depth: 0.2,
      bevelEnabled: true,
      bevelSize: 0.07,
      bevelThickness: 0.07,
      bevelSegments: 1,
      curveSegments: 1,
    });
    g.translate(0, 0, -0.1);
    return g;
  }, []);
}

function Fragment({
  index,
  active,
  pointerRef,
  calm,
}: {
  index: number;
  active: boolean;
  pointerRef: { current: { x: number; y: number } };
  calm: boolean;
}) {
  const m = team[index]!;
  const wing = useWingGeometry();
  const photo = useTexture(m.photo || placeholder);
  const body = useRef<Group>(null);
  const tone = active ? SIGNAL : MOONLIGHT;
  const side = index % 2 === 0 ? -1 : 1;
  const z = GATE_Z - (index + 1) * CRYSTAL_SPACING;
  // narrow viewports can't afford the lateral offset — keep the emblem in frame
  const narrow = useThree((s) => s.size.width) < 760;
  const x = side * (narrow ? 0.8 : 2.8);


  /**
   * The portrait plate is measured against the actual wing geometry instead of
   * hardcoded offsets: we take the wing bounding box, mirror it around the
   * emblem centre and derive the plate's centre and size from that. Any change
   * to the wing shape or its offset keeps the portrait centred.
   */
  const plate = useMemo(() => {
    wing.computeBoundingBox();
    const bb = wing.boundingBox!;
    const OFFSET_X = 0.55;
    const OFFSET_Y = 0.12;
    // mirrored vertical span of both wings

    const minY = bb.min.y + OFFSET_Y;
    const maxY = bb.max.y + OFFSET_Y;
    const centerY = (minY + maxY) / 2;
    // the plate fills the gap between the two wing roots, never overlapping them
    const gap = OFFSET_X * 2;
    const img = photo.image as { width?: number; height?: number } | undefined;
    const aspect = img?.width && img?.height ? img.width / img.height : 1;
    const width = Math.min(gap * 1.05, (maxY - minY) * 1.15 * aspect);
    return { centerY, width, height: width / aspect };

  }, [wing, photo]);

  // keep sampled colours in the same space as the rest of the scene
  photo.colorSpace = THREE.SRGBColorSpace;

  useFrame((state, delta) => {
    const g = body.current;
    if (!g) return;
    if (calm) {
      g.rotation.set(0, 0.4 * side, 0);
      g.position.y = 0;
      return;
    }
    // slow spin + subtle desktop pointer response (gradual, never snapping)
    // gentle yaw sway keeps the emblem silhouette readable instead of spinning
    g.rotation.y = Math.sin(state.clock.elapsedTime * 0.25 + index) * 0.45 + pointerRef.current.x * 0.25;
    void delta;
    const px = pointerRef.current.x;
    const py = pointerRef.current.y;
    g.rotation.x += (Math.sin(state.clock.elapsedTime * 0.3 + index) * 0.16 + py * 0.25 - g.rotation.x) * 0.05;
    g.position.x += (px * (active ? 0.9 : 0.3) - g.position.x) * 0.04;
    g.position.y = Math.sin(state.clock.elapsedTime * 0.5 + index * 1.7) * 0.55;
  });

  return (
    <group position={[x, 0, z]}>
      <group ref={body} scale={(active ? 2.05 : 1.65) * (narrow ? 0.72 : 1)}>
        {[1, -1].map((sx) => (
          <mesh key={sx} geometry={wing} position={[sx * 0.55, 0.12, 0]} scale={[sx, 1, 1]}>
            <meshStandardMaterial
              color="#0b0c10"
              emissive={MOONLIGHT}
              emissiveIntensity={active ? 0.09 : 0.03}
              roughness={0.18}
              metalness={0.95}
              flatShading
            />
          </mesh>
        ))}
        {/* the person — a framed portrait plate the wings grow out of */}
        <group position={[0, plate.centerY, 0]}>
          <mesh position={[0, 0, 0.16]}>
            <planeGeometry args={[plate.width, plate.height]} />
            <meshBasicMaterial map={photo} toneMapped={false} />
          </mesh>
          <mesh position={[0, 0, 0.08]}>
            <boxGeometry args={[plate.width * 1.12, plate.height * 1.12, 0.14]} />
            <meshStandardMaterial
              color="#0b0c10"
              emissive={tone}
              emissiveIntensity={active ? 0.14 : 0.05}
              metalness={1}
              roughness={0.3}
              flatShading
            />
          </mesh>

          <mesh position={[0, 0, 0.18]}>
            <planeGeometry args={[plate.width * 1.1, plate.height * 1.1]} />
            <meshBasicMaterial color={tone} wireframe transparent opacity={active ? 0.35 : 0.12} />
          </mesh>
        </group>

        {/* signal-lit facet outline */}
        {[1, -1].map((sx) => (
          <mesh
            key={`w${sx}`}
            geometry={wing}
            position={[sx * 0.55, 0.12, 0]}
            scale={[sx * 1.04, 1.04, 1.04]}
          >
            <meshBasicMaterial color={tone} wireframe transparent opacity={active ? 0.28 : 0.08} />
          </mesh>
        ))}
        {/* architectural shards orbiting the emblem */}
        {[0, 1, 2].map((k) => (
          <mesh
            key={k}
            position={[Math.cos(k * 2.1) * 2.1, Math.sin(k * 1.7) * 1.2, Math.sin(k * 2.4) * 1.1]}
            rotation={[k * 0.8, k * 1.2, k * 0.4]}
          >
            <tetrahedronGeometry args={[0.42, 0]} />
            <meshStandardMaterial
              color="#14161d"
              emissive={k % 2 ? SIGNAL : MOONLIGHT}
              emissiveIntensity={active ? 0.35 : 0.1}
              metalness={1}
              roughness={0.25}
              flatShading
            />
          </mesh>
        ))}
      </group>

      <pointLight
        color={active ? "#fff4da" : MOONLIGHT}
        intensity={active ? 9 : 3.5}
        distance={16}
        position={[0, 1.6, 2.4]}
      />

      <Html center distanceFactor={16} position={[0, -4.4, 0]}>
        <div
          className={`glass-pane w-56 rounded-lg px-5 py-4 text-center transition-opacity duration-500 ${
            active ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-secondary">
            0{index + 1}
          </p>
          <p className="display-face mt-1 text-lg tracking-[0.06em] text-foreground">{m.name}</p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            {m.role}
          </p>
        </div>
      </Html>
    </group>
  );
}

/** Two sliding blast doors — ribbed hull plating, warning chevrons and a
 * glowing seam that flares as the doors part. */
function Gate({ openRef }: { openRef: { current: number } }) {
  const left = useRef<Group>(null);
  const right = useRef<Group>(null);
  const seam = useRef<Mesh>(null);

  useFrame(() => {
    const o = openRef.current;
    if (left.current) left.current.position.x = -3 - o * 12;
    if (right.current) right.current.position.x = 3 + o * 12;
    if (seam.current) {
      const mat = seam.current.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, 1 - o * 1.6);
      seam.current.scale.x = 1 + o * 6;
    }
  });

  return (
    <group position={[0, 0, GATE_Z]}>
      {/* hot seam behind the doors */}
      <mesh ref={seam} position={[0, 0, -0.4]}>
        <planeGeometry args={[0.7, 18]} />
        <meshBasicMaterial color="#dff2ff" transparent toneMapped={false} />
      </mesh>

      {[left, right].map((ref, i) => {
        const dir = i === 0 ? -1 : 1;
        return (
          <group key={i} ref={ref} position={[dir * 3, 0, 0]}>
            {/* main plate */}
            <mesh>
              <boxGeometry args={[6, 18, 1]} />
              <meshStandardMaterial color="#14171f" metalness={1} roughness={0.34} flatShading />
            </mesh>
            {/* recessed inner panel */}
            <mesh position={[-dir * 0.4, 0, 0.55]}>
              <boxGeometry args={[4.4, 15.5, 0.2]} />
              <meshStandardMaterial color="#0d1017" metalness={1} roughness={0.28} />
            </mesh>
            {/* horizontal hull ribs */}
            {[-6, -3.4, -0.8, 1.8, 4.4, 7].map((y) => (
              <mesh key={y} position={[-dir * 0.4, y, 0.72]}>
                <boxGeometry args={[4.4, 0.34, 0.22]} />
                <meshStandardMaterial
                  color="#1d222c"
                  metalness={1}
                  roughness={0.2}
                  emissive={MOONLIGHT}
                  emissiveIntensity={0.12}
                />
              </mesh>
            ))}
            {/* warning chevrons along the closing edge */}
            {[-5.5, -3.5, -1.5, 0.5, 2.5, 4.5, 6.5].map((y) => (
              <mesh
                key={`c${y}`}
                position={[dir * 2.2, y, 0.76]}
                rotation={[0, 0, dir * Math.PI * 0.25]}
              >
                <boxGeometry args={[0.5, 1.1, 0.12]} />
                <meshStandardMaterial
                  color="#0b0c10"
                  emissive={SIGNAL}
                  emissiveIntensity={0.45}
                  metalness={1}
                  roughness={0.3}
                />
              </mesh>
            ))}
            {/* edge light bar */}
            <mesh position={[dir * 2.85, 0, 0.6]}>
              <boxGeometry args={[0.25, 17, 0.25]} />
              <meshBasicMaterial color={MOONLIGHT} toneMapped={false} />
            </mesh>
            {/* hazard strip near the top */}
            <mesh position={[-dir * 0.4, 8.4, 0.74]}>
              <boxGeometry args={[4.4, 0.5, 0.2]} />
              <meshStandardMaterial
                color="#0b0c10"
                emissive={SIGNAL}
                emissiveIntensity={0.5}
                metalness={1}
                roughness={0.3}
              />
            </mesh>
            <pointLight
              color={MOONLIGHT}
              intensity={4}
              distance={14}
              position={[dir * 2.4, 0, 3]}
            />
          </group>
        );
      })}
    </group>
  );
}

/** Tracks the pointer once, in scene space, for the hover response. */
function PointerTracker({ pointerRef }: { pointerRef: { current: { x: number; y: number } } }) {
  const { pointer } = useThree();
  useFrame(() => {
    pointerRef.current.x += (pointer.x - pointerRef.current.x) * 0.08;
    pointerRef.current.y += (pointer.y - pointerRef.current.y) * 0.08;
  });
  return null;
}

function JourneyCamera({ progressRef, calm }: { progressRef: { current: number }; calm: boolean }) {
  const total = useMemo(() => (team.length + 0.6) * CRYSTAL_SPACING, []);
  useFrame(({ camera }) => {
    const p = progressRef.current;
    const cam = camera as PerspectiveCamera;
    const drift = calm ? 0 : 1;
    cam.position.set(Math.sin(p * 5) * 1.4 * drift, Math.cos(p * 4) * 1.1 * drift, 20 - p * total);
    cam.lookAt(0, 0, cam.position.z - 20);
  });
  return null;
}

export function CrystalScene({
  progressRef,
  openRef,
  active,
  calm = false,
}: {
  progressRef: { current: number };
  openRef: { current: number };
  active: number;
  calm?: boolean;
}) {
  const pointerRef = useRef({ x: 0, y: 0 });

  return (
    <>
      <JourneyCamera progressRef={progressRef} calm={calm} />
      <PointerTracker pointerRef={pointerRef} />
      <color attach="background" args={["#05060a"]} />
      <fog attach="fog" args={["#05060a", 18, 70]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[6, 10, 4]} intensity={0.9} color={MOONLIGHT} />
      <directionalLight position={[-8, -4, 6]} intensity={0.25} color={SIGNAL} />
      <Stars radius={120} depth={80} count={2200} factor={4} fade speed={0.6} />
      <Gate openRef={openRef} />
      {team.map((m, i) => (
        <Fragment
          key={`${m.name}-${i}`}
          index={i}
          active={active === i}
          pointerRef={pointerRef}
          calm={calm}
        />
      ))}
    </>
  );
}

export function CrystalCanvas(props: {
  progressRef: { current: number };
  openRef: { current: number };
  active: number;
  calm?: boolean;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      dpr={[1, 1.6]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
    >
      <CrystalScene {...props} />
    </Canvas>
  );
}
