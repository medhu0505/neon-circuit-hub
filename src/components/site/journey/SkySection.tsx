import { useRef } from "react";
import { CodeRain } from "@/components/site/CodeRain";
import { InteractiveMoon } from "./InteractiveMoon";
import { BatSignal } from "./BatSignal";
import { mapRange, useSectionScroll } from "./useJourney";
import cityAsset from "@/assets/city-full.png.asset.json";

/**
 * Section 0 — the night sky above the city. Nebula plate, 2D moon and the
 * projected Quantum v2.0 signal, which is now the hero's only focal point.
 * Scrolling out descends toward the skyline so the events section reads as a
 * continuation rather than a new page.
 */
export function SkySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { progress } = useSectionScroll(ref);

  const moonOpacity = mapRange(progress, 0.15, 0.85, 1, 0);
  const moonShift = mapRange(progress, 0, 1, 0, -160);
  const moonScale = mapRange(progress, 0, 1, 1, 0.82);
  const cityRise = mapRange(progress, 0, 1, 0, -140);
  // Keep the skyline subordinate to the projected signal; it grows only after the hero clears.
  const cityScale = mapRange(progress, 0, 1, 0.82, 1.08);

  return (
    <section ref={ref} className="relative h-[190vh]" aria-label="Quantum v2.0 — the night sky">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* nebula plate */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/images/moon-nebula.jpg)",
            opacity: mapRange(progress, 0.3, 1, 1, 0.25),
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,transparent_25%,var(--background)_92%)]" />
        <CodeRain />
        <div className="grid-drift pointer-events-none absolute inset-0 opacity-40" />
        <div className="noise pointer-events-none absolute inset-0" />

        <h1 className="sr-only">Quantum v2.0 — inter-school tech and culture fest</h1>

        <BatSignal dim={mapRange(progress, 0.35, 0.85, 0, 1)} />

        {/* city silhouette rising toward the camera — full composition, contained
            so the artwork is never cut in half at any aspect ratio */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20"
          style={{
            transform: `translate3d(0, ${cityRise}px, 0) scale(${cityScale})`,
            transformOrigin: "50% 100%",
          }}
        >
          <img
            src={cityAsset.url}
            alt=""
            aria-hidden="true"
            /* Keep room for the signal on narrow screens while preserving skyline detail. */
            className="block h-auto w-[150%] max-w-none -translate-x-[17%] select-none object-contain sm:w-[92%] sm:translate-x-[4%]"
          />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[24vh] bg-gradient-to-t from-background to-transparent" />

        {/* celestial layer — always above the city and every building layer */}
        <div
          className="pointer-events-none absolute right-[5vw] top-[6vh] z-40 w-[30vw] min-w-[110px] max-w-[360px] md:w-[26vw] md:min-w-[160px]"
          style={{
            opacity: moonOpacity,
            transform: `translate3d(${-moonShift * 0.35}px, ${moonShift}px, 0) scale(${moonScale})`,
          }}
        >
          <div className="pointer-events-auto">
            <InteractiveMoon />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-6 z-30 flex justify-center font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground/70">
          <span className="scroll-cue mr-3 inline-block">↓</span> descend into the city
        </div>
      </div>
    </section>
  );
}
