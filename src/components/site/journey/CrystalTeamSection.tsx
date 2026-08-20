import { useEffect, useRef, useState } from "react";
import { ClientOnly } from "@/components/site/ClientOnly";
import { Reveal } from "@/components/site/Reveal";
import { TeamGrid } from "@/components/site/TeamGrid";
import { team } from "@/lib/team";
import { CrystalCanvas, hasWebGL } from "./CrystalJourney";
import { mapRange, usePrefersReducedMotion, useSectionScroll } from "./useJourney";

/**
 * Section 2 — the crystal atrium. A spaceship gate opens as the section is
 * entered, then the camera travels through deep space past one spinning
 * crystal per team member. Reduced-motion or no-WebGL visitors get the
 * original holographic team grid instead.
 */
export function CrystalTeamSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { progress, near } = useSectionScroll(ref);
  const reduced = usePrefersReducedMotion();
  const [webgl, setWebgl] = useState(true);
  useEffect(() => setWebgl(hasWebGL()), []);

  const progressRef = useRef(0);
  progressRef.current = progress;
  const openRef = useRef(0);
  openRef.current = mapRange(progress, 0.02, 0.14, 0, 1);

  const active = Math.min(
    team.length - 1,
    Math.max(0, Math.floor(mapRange(progress, 0.14, 1, 0, team.length))),
  );

  if (reduced || !webgl) return <TeamFallback />;

  return (
    <section
      id="team"
      ref={ref}
      className="relative scroll-mt-24"
      style={{ height: `${team.length * 85 + 80}vh` }}
      aria-label="The people behind Quantum v2.0"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-background">
        <ClientOnly fallback={<div className="h-full w-full bg-background" />}>
          {near ? (
            <CrystalCanvas progressRef={progressRef} openRef={openRef} active={active} />
          ) : null}
        </ClientOnly>

        <div className="noise pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />

        <div className="pointer-events-none absolute inset-x-0 top-10 z-10 mx-auto max-w-6xl px-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
            the crystal atrium
          </p>
          <h2 className="mt-4 text-3xl font-bold uppercase leading-[0.95] md:text-5xl">
            <span className="block text-foreground">The people</span>
            <span className="wordmark block">behind it.</span>
          </h2>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-10 z-10 mx-auto max-w-6xl px-5">
          <div className="h-px w-full bg-border/60">
            <div
              className="h-px bg-secondary transition-[width] duration-150"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground/70">
            crystal {active + 1} / {team.length}
          </p>
        </div>
      </div>

      {/* accessible, always-present roster for screen readers and crawlers */}
      <ul className="sr-only">
        {team.map((m) => (
          <li key={`${m.name}-${m.role}`}>
            {m.name} — {m.role}
          </li>
        ))}
      </ul>
    </section>
  );
}

function TeamFallback() {
  return (
    <section
      id="team"
      className="noise relative scroll-mt-24 overflow-hidden border-y border-border/60 py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_10%,color-mix(in_oklab,var(--secondary)_16%,transparent),transparent_70%)]" />
      <div className="relative mx-auto max-w-6xl px-5">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
            the crystal atrium
          </p>
          <h2 className="mt-5 text-4xl font-bold uppercase leading-[0.95] md:text-6xl">
            <span className="block text-foreground">The people</span>
            <span className="wordmark block">behind it.</span>
          </h2>
        </Reveal>
        <div className="mt-16">
          <TeamGrid />
        </div>
      </div>
    </section>
  );
}
