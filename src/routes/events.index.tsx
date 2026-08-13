import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { events } from "@/lib/events";

export const Route = createFileRoute("/events/")({
  head: () => ({
    meta: [
      { title: "Events — Quantum 2026" },
      {
        name: "description",
        content:
          "Six events at Quantum 2026: Quiz, Film Making, Ad Shoot, Surprise, Online Gaming and Pitch. Formats, timings and eligibility for every category.",
      },
      { property: "og:title", content: "Events — Quantum 2026" },
      {
        property: "og:description",
        content: "Quiz, Film Making, Ad Shoot, Surprise, Online Gaming and Pitch.",
      },
      { property: "og:url", content: "/events" },
    ],
    links: [{ rel: "canonical", href: "/events" }],
  }),
  component: EventsPage,
});

function EventsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-20">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-secondary">// events</p>
        <h1 className="mt-4 text-4xl font-bold md:text-5xl">
          Six events. <span className="wordmark">One stage.</span>
        </h1>
        <div className="dashed-motif mt-6 w-40" />
        <p className="mt-6 max-w-2xl text-muted-foreground">
          Pick your lane — or enter more than one. Every event runs independently, with its own
          format, panel and points feeding the overall school tally.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {events.map((e, i) => (
          <Reveal key={e.slug} delay={i * 70}>
            <Link
              to="/events/$slug"
              params={{ slug: e.slug }}
              className="glow-card block h-full rounded-md p-6"
            >
              <p className="font-mono text-[11px] uppercase tracking-widest text-secondary">
                {e.format}
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight">{e.name}</h2>
              <p className="mt-1 font-mono text-xs text-muted-foreground">{e.tagline}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{e.description}</p>
              <p className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-primary">
                view details →
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}