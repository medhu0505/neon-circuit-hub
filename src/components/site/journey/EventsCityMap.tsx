import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { BUILDINGS, SEGMENTS, cityEvents } from "./cityConfig";
import { mapRange, usePrefersReducedMotion, useSectionScroll } from "./useJourney";

/**
 * The city of events as a scroll-driven scene.
 *
 * One tall section pins the skyline; each tower is its own transparent cutout
 * that rises from below the horizon during its scroll segment, floats gently
 * while active, and drives the bottom event panel. Scroll progress comes from
 * the single `useSectionScroll` source, so fast scrolling, reverse scrolling,
 * resizing and reloads at a non-zero offset all stay in sync. Reduced-motion
 * visitors keep the synchronisation with the decorative motion removed.
 */
export function EventsCityMap() {
  const ref = useRef<HTMLDivElement>(null);
  const { progress } = useSectionScroll(ref);
  const reduced = usePrefersReducedMotion();

  // hysteresis: only hand over once the next building clearly owns the scroll
  const [active, setActive] = useState(() => indexFor(progress, 0));
  useEffect(() => {
    setActive((prev) => indexFor(progress, prev));
  }, [progress]);

  const current = cityEvents[active]!;

  return (
    <section
      id="events"
      ref={ref}
      className="relative scroll-mt-24"
      style={{ height: `${BUILDINGS.length * 60 + 120}vh` }}
      aria-label="City of events"
    >
      <div className="noise sticky top-0 flex h-screen flex-col overflow-hidden border-y border-border/60 bg-background">
        <div className="relative z-30 mx-auto w-full max-w-6xl px-5 pt-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
            the event universe
          </p>
          <h2 className="mt-3 text-3xl font-bold uppercase leading-[0.95] md:text-5xl">
            <span className="block text-foreground">City of</span>
            <span className="wordmark block">events.</span>
          </h2>
        </div>

        {/* the stage — towers stand on a common ground line */}
        <div className="relative min-h-0 flex-1">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_90%,color-mix(in_oklab,var(--secondary)_14%,transparent),transparent_70%)]" />

          <div className="absolute inset-x-0 bottom-0 top-0 mx-auto w-full max-w-[1500px] overflow-hidden px-4">
            {BUILDINGS.map((b, i) => {
              const seg = SEGMENTS[i]!;
              const e = cityEvents[i]!;
              const on = active === i;
              // rise across the first part of the segment, then hold
              const rise = reduced
                ? 0
                : mapRange(
                    progress,
                    seg.start - 0.06,
                    seg.start + (seg.end - seg.start) * 0.5,
                    112,
                    0,
                  );
              return (
                <Link
                  key={e.slug}
                  to="/events/$slug"
                  params={{ slug: e.slug }}
                  aria-label={`${e.name} — ${e.tagline}`}
                  className="absolute bottom-0 block outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                  style={{
                    left: `${b.left}%`,
                    width: `${b.width}%`,
                    height: `${b.height * 100}%`,
                    transform: `translate3d(-50%, ${rise.toFixed(2)}%, 0)`,
                    transition: "transform 260ms cubic-bezier(0.22,1,0.36,1), filter 400ms ease",
                    filter: on
                      ? `brightness(1.15) drop-shadow(0 0 46px color-mix(in oklab, ${b.tone} 60%, transparent))`
                      : "brightness(0.6) saturate(0.75)",
                  }}
                >
                  <div
                    className="relative h-full w-full"
                    style={
                      reduced
                        ? undefined
                        : { animation: `city-float ${9 + i * 0.7}s ease-in-out ${b.phase}s infinite` }
                    }
                  >
                    <img
                      src={b.src}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="h-full w-full select-none object-contain object-bottom"
                    />
                  </div>
                </Link>
              );
            })}

            {/* ground haze so the towers read as standing in the city */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(to_top,var(--background),transparent)]" />
          </div>
        </div>

        {/* bottom event panel — always bound to the active building */}
        <div className="relative z-30 mx-auto w-full max-w-6xl px-5 pb-8">
          <div className="h-px w-full bg-border/60">
            <div
              className="h-px bg-secondary transition-[width] duration-150"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-secondary">
                tower {active + 1} / {BUILDINGS.length}
              </p>
              <h3 className="wordmark text-3xl uppercase leading-none md:text-5xl">
                {current.name}
              </h3>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                {current.tagline} · {current.format}
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                to="/events/$slug"
                params={{ slug: current.slug }}
                className="pill-solid px-6 py-3 font-mono text-xs uppercase tracking-[0.25em]"
              >
                open event
              </Link>
              <Link
                to="/events"
                className="glitch pill border border-border/80 px-6 py-3 font-mono text-xs uppercase tracking-[0.25em] text-foreground hover:border-secondary/70"
              >
                all events
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Segment lookup with hysteresis so boundaries never flicker. */
function indexFor(p: number, prev: number) {
  const hold = 0.02;
  const cur = SEGMENTS[prev];
  if (cur && p >= cur.start - hold && p <= cur.end + hold) return prev;
  for (let i = 0; i < SEGMENTS.length; i++) {
    const s = SEGMENTS[i]!;
    if (p < s.end || i === SEGMENTS.length - 1) return i;
  }
  return 0;
}
