import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { events, getEvent } from "@/lib/events";

export const Route = createFileRoute("/events/$slug")({
  loader: ({ params }) => {
    const event = getEvent(params.slug);
    if (!event) throw notFound();
    return { title: event.title, short: event.short };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Event unavailable — Interschool Arena 2026" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.title} — Interschool Arena 2026`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.short },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.short },
      ],
    };
  },
  component: EventDetail,
});

function EventDetail() {
  const { slug } = Route.useParams();
  const event = getEvent(slug)!;
  const Icon = event.icon;
  const others = events.filter((e) => e.slug !== slug).slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl px-5 py-20">
      <Reveal>
        <Link
          to="/tracks"
          className="glitch font-mono text-xs uppercase tracking-[0.3em] text-secondary"
        >
          ← ./events
        </Link>
        <div className="mt-6 flex items-start gap-5">
          <span className="glow-card rounded-md p-4">
            <Icon className="h-7 w-7 text-primary" />
          </span>
          <div>
            <h1 className="text-4xl font-bold md:text-5xl">
              <span className="text-primary neon-text">{event.title}</span>
            </h1>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              {event.category}
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <span className="border border-primary/50 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-primary">
            {event.format}
          </span>
          <span className="border border-secondary/50 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-secondary">
            {event.teamSize}
          </span>
        </div>
        <p className="mt-8 max-w-2xl leading-relaxed text-muted-foreground">{event.description}</p>
      </Reveal>

      <div className="mt-14 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal>
          <div className="glow-card h-full rounded-md p-7">
            <h2 className="font-mono text-lg text-primary">rules</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {event.rules.map((r) => (
                <li key={r} className="flex gap-3">
                  <span className="font-mono text-primary">›</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="space-y-6">
          <Reveal delay={80}>
            <div className="glow-card rounded-md p-7">
              <h2 className="font-mono text-lg text-secondary">timing</h2>
              <p className="mt-3 text-sm text-muted-foreground">{event.slot}</p>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div className="glow-card rounded-md p-7">
              <h2 className="font-mono text-lg text-secondary">eligibility</h2>
              <p className="mt-3 text-sm text-muted-foreground">{event.eligibility}</p>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal delay={80}>
        <Link
          to="/register"
          search={{ event: event.slug }}
          className="glitch mt-12 inline-block border border-primary bg-primary/10 px-8 py-3 font-mono text-xs uppercase tracking-[0.25em] text-primary transition-shadow hover:shadow-[var(--glow-primary)]"
        >
          register_for_{event.name}
        </Link>
      </Reveal>

      <Reveal className="mt-24">
        <h2 className="font-mono text-sm uppercase tracking-[0.3em] text-muted-foreground">
          other events
        </h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {others.map((e) => (
            <Link
              key={e.slug}
              to="/events/$slug"
              params={{ slug: e.slug }}
              className="glow-card block rounded-md p-6 transition-transform hover:-translate-y-1"
            >
              <e.icon className="h-5 w-5 text-primary" />
              <p className="mt-3 font-mono text-base text-foreground">{e.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{e.short}</p>
            </Link>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
