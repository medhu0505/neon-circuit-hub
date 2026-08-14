import { Canvas, useFrame } from "@react-three/fiber";
import { Html, MeshTransmissionMaterial, Stars } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import type { Group, Mesh } from "three";
import { events } from "@/lib/events";

/**
 * The event orrery as a real 3D scene, built from the R3F examples:
 *  - `html, annotations` → drei <Html> anchors each label to its planet in 3D,
 *    so labels track depth instead of being 2D overlays that collide
 *  - `glass, transmission` → MeshTransmissionMaterial gives the planets actual
 *    refractive glass rather than a CSS approximation
 *  - `effects, bloom` → real neon bloom on the star and planets
 *  - `effects, particles` → drei <Stars> inside the same scene
 *
 * The CSS version could never get planets to pass behind the star; here z-order
 * is just geometry.
 */

const PLANETS = [
  { radius: 2.6, speed: 0.34, size: 0.2, tint: "#4ec8e0" },
  { radius: 3.5, speed: 0.26, size: 0.28, tint: "#f9418a" },
  { radius: 4.4, speed: 0.2, size: 0.22, tint: "#8b46f0" },
  { radius: 5.3, speed: 0.16, size: 0.32, tint: "#4ec8e0" },
  { radius: 6.2, speed: 0.13, size: 0.24, tint: "#f9418a" },
  { radius: 7.1, speed: 0.1, size: 0.3, tint: "#8b46f0" },
];

function OrbitRing({ radius }: { radius: number }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.012, radius + 0.012, 128]} />
      <meshBasicMaterial color="#8b46f0" transparent opacity={0.22} />
    </mesh>
  );
}

function Planet({
  index,
  onHover,
  active,
}: {
  index: number;
  onHover: (i: number | null) => void;
  active: boolean;
}) {
  const p = PLANETS[index]!;
  const e = events[index]!;
  const ref = useRef<Group>(null);
  const navigate = useNavigate();

  useFrame((state) => {
    if (!ref.current) return;
    // hovering freezes this planet; the others keep going
    const t = active ? 0 : state.clock.elapsedTime;
    const a = t * p.speed + (index * Math.PI * 2) / PLANETS.length;
    ref.current.position.set(Math.cos(a) * p.radius, 0, Math.sin(a) * p.radius);
  });

  return (
    <group ref={ref}>
      <mesh
        onPointerOver={(ev) => {
          ev.stopPropagation();
          onHover(index);
        }}
        onPointerOut={() => onHover(null)}
        onClick={(ev) => {
          ev.stopPropagation();
          void navigate({ to: "/events/$slug", params: { slug: e.slug } });
        }}
        scale={active ? 1.45 : 1}
      >
        <sphereGeometry args={[p.size, 48, 48]} />
        <MeshTransmissionMaterial
          color={p.tint}
          thickness={p.size * 1.4}
          roughness={0.08}
          chromaticAberration={0.35}
          anisotropy={0.3}
          distortion={0.2}
          distortionScale={0.3}
          temporalDistortion={0.1}
          ior={1.5}
          emissive={p.tint}
          emissiveIntensity={active ? 1.4 : 0.55}
        />
      </mesh>

      <Html
        center
        distanceFactor={12}
        position={[0, p.size + 0.42, 0]}
        style={{ pointerEvents: "none" }}
      >
        <span
          className={`display-face whitespace-nowrap rounded px-1.5 py-0.5 text-[11px] uppercase tracking-[0.16em] transition-colors duration-200 ${
            active ? "bg-background/80 text-foreground" : "text-muted-foreground/80"
          }`}
        >
          {e.name}
        </span>
      </Html>
    </group>
  );
}

function Sun() {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.2) * 0.03;
      ref.current.scale.setScalar(pulse);
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.15, 64, 64]} />
      <meshStandardMaterial
        color="#ffb27a"
        emissive="#ff5fa2"
        emissiveIntensity={2.4}
        toneMapped={false}
      />
    </mesh>
  );
}

function Scene({
  active,
  setActive,
}: {
  active: number | null;
  setActive: (i: number | null) => void;
}) {
  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[0, 0, 0]} intensity={140} color="#ff7ab8" distance={40} decay={2} />
      <directionalLight position={[6, 8, 4]} intensity={0.6} color="#8fe6ff" />

      <Stars radius={60} depth={40} count={1600} factor={3} saturation={0} fade speed={0.6} />

      <Sun />
      {PLANETS.map((p, i) => (
        <OrbitRing key={`ring-${i}`} radius={p.radius} />
      ))}
      {PLANETS.map((_, i) => (
        <Planet key={events[i]!.slug} index={i} onHover={setActive} active={active === i} />
      ))}

      <EffectComposer>
        <Bloom intensity={1.15} luminanceThreshold={0.35} luminanceSmoothing={0.5} mipmapBlur />
      </EffectComposer>
    </>
  );
}

export function Orrery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="glass-pane relative overflow-hidden rounded-3xl">
      <div className="relative aspect-square w-full sm:aspect-[4/3] lg:aspect-[16/9]">
        <Canvas
          camera={{ position: [0, 6.5, 11], fov: 42 }}
          dpr={[1, 1.6]}
          gl={{ antialias: true }}
        >
          <Scene active={active} setActive={setActive} />
        </Canvas>
      </div>

      <div className="relative flex min-h-16 flex-wrap items-center justify-between gap-3 border-t border-border/50 px-6 py-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          <span className="text-secondary">Quantum V2.0</span>
          {active === null ? " · hover a planet" : ` · ${events[active]!.tagline}`}
        </p>
        <a
          href="/events"
          className="glitch font-mono text-[11px] uppercase tracking-[0.25em] text-secondary"
        >
          view all events →
        </a>
      </div>
    </div>
  );
}
