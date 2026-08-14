import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { events } from "@/lib/events";

/**
 * The six events laid out as a constellation around a central Quantum node,
 * with dashed connectors. Pure SVG — hovering a node lights its edge and
 * surfaces the tagline in the readout below.
 */

// hand-placed so the labels clear each other — "Online Gaming" is the long one,
// so it gets the left edge and plenty of room before Surprise starts.
// viewBox is 1000x520, order matches `events`.
const positions = [
  { x: 215, y: 112 }, // quiz
  { x: 775, y: 104 }, // film making
  { x: 892, y: 292 }, // ad shoot
  { x: 726, y: 436 }, // surprise
  { x: 232, y: 430 }, // online gaming
  { x: 104, y: 286 }, // pitch
];

const CX = 500;
const CY = 262;

export function EventUniverse() {
  const [active, setActive] = useState<number | null>(null);
  const nodes = events.slice(0, positions.length);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/25">
      <div className="grid-drift pointer-events-none absolute inset-0 opacity-50" />

      <svg
        viewBox="0 0 1000 520"
        className="relative block h-auto w-full"
        role="img"
        aria-label="The six Quantum events arranged as a constellation"
      >
        {nodes.map((e, i) => {
          const p = positions[i]!;
          const on = active === i;
          return (
            <line
              key={`edge-${e.slug}`}
              x1={CX}
              y1={CY}
              x2={p.x}
              y2={p.y}
              stroke={on ? "oklch(0.79 0.134 211 / 70%)" : "oklch(0.61 0.219 293 / 28%)"}
              strokeWidth={on ? 1.6 : 1}
              strokeDasharray="5 7"
            />
          );
        })}

        {/* centre node */}
        <circle cx={CX} cy={CY} r="46" fill="none" stroke="oklch(0.61 0.219 293 / 45%)" />
        <circle cx={CX} cy={CY} r="7" fill="oklch(0.79 0.134 211)" />
        <text
          x={CX}
          y={CY + 74}
          textAnchor="middle"
          className="fill-muted-foreground font-mono text-[15px] uppercase tracking-[0.3em]"
        >
          Quantum V2.0
        </text>

        {nodes.map((e, i) => {
          const p = positions[i]!;
          const on = active === i;
          const anchor = p.x < 300 ? "start" : p.x > 780 ? "end" : "middle";
          return (
            <Link key={e.slug} to="/events/$slug" params={{ slug: e.slug }}>
              <g
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive((v) => (v === i ? null : v))}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className="cursor-pointer"
              >
                {/* generous invisible hit area */}
                <circle cx={p.x} cy={p.y} r="54" fill="transparent" />
                {on && (
                  <circle cx={p.x} cy={p.y} r="20" fill="oklch(0.7 0.194 4 / 12%)" stroke="none" />
                )}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={on ? 8 : 5.5}
                  fill={on ? "oklch(0.79 0.134 211)" : "oklch(0.7 0.194 4)"}
                />
                <text
                  x={p.x + (anchor === "start" ? 18 : anchor === "end" ? -18 : 0)}
                  y={p.y + 40}
                  textAnchor={anchor}
                  className={`display-face text-[26px] uppercase tracking-[0.14em] ${
                    on ? "fill-foreground" : "fill-muted-foreground/70"
                  }`}
                >
                  {e.name}
                </text>
              </g>
            </Link>
          );
        })}
      </svg>

      <div className="relative flex min-h-16 flex-wrap items-center justify-between gap-3 border-t border-border/60 px-6 py-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          {active === null ? "select a node" : nodes[active]!.tagline}
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
