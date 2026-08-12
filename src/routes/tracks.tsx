import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { events } from "@/lib/events";

export const Route = createFileRoute("/tracks")({
  head: () => ({
    meta: [
      { title: "Events — Interschool Arena 2026" },
      {
        name: "description",
        content:
          "Six events: Quiz, Film Making, Ad Shoot, Surprise, Online Gaming and Pitch. Formats, team sizes and the full day timeline.",
      },
      { property: "og:title", content: "Events — Interschool Arena 2026" },
      {
        property: "og:description",
        content: "Quiz, Film Making, Ad Shoot, Surprise, Online Gaming and Pitch — six events, one arena.",
      },
    ],
  }),
  component: EventsPage,
});

const timeline = [
  ["08:30", "Check-in & registration desk", "Teams collect passes and confirm slots."],
  ["09:00", "Opening brief", "Rules, judging criteria and the day's schedule."],
  ["09:30", "Quiz prelims + Film Making brief", "Written prelims run while film teams start shooting."],
  ["13:00", "Ad Shoot & Online Gaming qualifiers", "Afternoon block opens across both arenas."],
  ["16:00", "Pitch round + Surprise reveal", "Judging panels convene; the wildcard opens."],
  ["19:00", "Finals & prize giving", "Grand finals on the main stage, then awards."],
] as const;

function EventsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-20">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-secondary">// events</p>
        <h1 className="mt-4 text-4xl font-bold md:text-5xl">
          Six events. <span className="text-primary neon-text">One arena.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Every event is scored independently and rolls up into a single school leaderboard. Enter
          one, enter all six — the schools that spread wide tend to finish on top.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {events.map((e, i) => (
          <Reveal key={e.slug} delay={i * 70}>
            <Link
              to="/events/$slug"
              params={{ slug: e.slug }}
              className="glow-card block h-full rounded-md p-6 transition-transform hover:-translate-y-1"
            >
              <e.icon className="h-6 w-6 text-primary" />
              <h2 className="mt-4 font-mono text-lg text-foreground">{e.name}</h2>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-secondary">
                {e.format} · {e.teamSize}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{e.short}</p>
              <p className="mt-5 font-mono text-[11px] uppercase tracking-widest text-primary">
                view_details →
              </p>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-24">
        <h2 className="text-2xl font-bold md:text-3xl">
          <span className="text-primary">$</span> cat timeline.txt
        </h2>
      </Reveal>

      <div className="mt-8 border-l border-border pl-6">
        {timeline.map(([time, title, desc], i) => (
          <Reveal key={time} delay={i * 60}>
            <div className="relative py-5">
              <span className="absolute -left-[31px] top-7 h-2.5 w-2.5 rounded-full bg-primary shadow-[var(--glow-primary)]" />
              <div className="flex flex-wrap items-baseline gap-x-4">
                <span className="font-mono text-sm text-primary">{time}</span>
                <span className="font-mono text-base text-foreground">{title}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
