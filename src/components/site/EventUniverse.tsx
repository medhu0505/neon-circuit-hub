import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { events } from "@/lib/events";

/**
 * The six events as a solar system: Quantum V2.0 is the sun, each event is a
 * planet on its own orbit, seen from above.
 *
 * Mechanics: a full-size wrapper per planet spins around the centre; the planet
 * sits at the top of that wrapper (`top: 50% - radius`), so the spin sweeps it
 * around a circle. The planet then counter-spins at the same rate so its label
 * stays upright. Offsets are percentages of the container HEIGHT (via
 * aspect-square rings) so orbits stay circular in a wide box.
 *
 * Hovering a planet pauses its orbit and lights up its ring.
 */

/**
 * Radii are % of container height from the centre, so the outermost orbit must
 * stay under 50% minus room for the planet disc and the label beneath it —
 * otherwise the outer planet (Pitch) is clipped at the top and bottom of its
 * orbit. 40% leaves that headroom.
 */
const PLANETS = [
  { radius: 11, seconds: 26, tint: "oklch(0.79 0.134 211)" },
  { radius: 17, seconds: 38, tint: "oklch(0.7 0.194 4)" },
  { radius: 23, seconds: 52, tint: "oklch(0.61 0.219 293)" },
  { radius: 29, seconds: 68, tint: "oklch(0.79 0.134 211)" },
  { radius: 33, seconds: 86, tint: "oklch(0.7 0.194 4)" },
  { radius: 38, seconds: 106, tint: "oklch(0.61 0.219 293)" },
];

export function EventUniverse() {
  const [active, setActive] = useState<number | null>(null);
  const planets = events.slice(0, PLANETS.length);

  return (
    <div className="glass-pane relative overflow-hidden rounded-3xl">
      <div className="grid-drift pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative aspect-square w-full sm:aspect-[4/3] lg:aspect-[16/9]">
        {/* orbit rings — square boxes sized off the container height */}
        {PLANETS.map((p, i) => (
          <div
            key={`orbit-${planets[i]?.slug ?? i}`}
            className="pointer-events-none absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed transition-colors duration-300"
            style={{
              height: `${p.radius * 2}%`,
              borderColor:
                active === i ? "oklch(0.79 0.134 211 / 55%)" : "oklch(0.61 0.219 293 / 22%)",
            }}
          />
        ))}

        {planets.map((e, i) => {
          const p = PLANETS[i]!;
          const on = active === i;
          const spin = {
            animationName: "orbit-spin",
            animationDuration: `${p.seconds}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationDelay: `-${(p.seconds / PLANETS.length) * i}s`,
            animationPlayState: on ? ("paused" as const) : ("running" as const),
          };

          return (
            <div key={e.slug} className="pointer-events-none absolute inset-0" style={spin}>
              <div className="absolute left-1/2" style={{ top: `${50 - p.radius}%` }}>
                {/* counter-spin keeps the disc and label upright */}
                <div style={{ ...spin, animationDirection: "reverse" }}>
                  <Link
                    to="/events/$slug"
                    params={{ slug: e.slug }}
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive((v) => (v === i ? null : v))}
                    onFocus={() => setActive(i)}
                    onBlur={() => setActive(null)}
                    className="pointer-events-auto absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                  >
                    <span
                      className="block rounded-full transition-all duration-300"
                      style={{
                        width: on ? 22 : 14,
                        height: on ? 22 : 14,
                        background: p.tint,
                        boxShadow: `0 0 ${on ? 32 : 15}px ${p.tint}`,
                      }}
                    />
                    <span
                      className={`display-face mt-2.5 whitespace-nowrap text-[11px] uppercase tracking-[0.18em] transition-colors md:text-sm ${
                        on ? "text-foreground" : "text-muted-foreground/70"
                      }`}
                    >
                      {e.name}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

        {/* the sun */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
          <span className="sun-core block h-14 w-14 rounded-full md:h-20 md:w-20" />
          <span className="mt-4 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:text-xs">
            Quantum V2.0
          </span>
        </div>
      </div>

      <div className="relative flex min-h-16 flex-wrap items-center justify-between gap-3 border-t border-border/50 px-6 py-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          {active === null ? "select a planet" : planets[active]!.tagline}
        </p>
        <Link
          to="/events"
          className="glitch font-mono text-[11px] uppercase tracking-[0.25em] text-secondary"
        >
          view all events →
        </Link>
      </div>
    </div>
  );
}
