import { createFileRoute, Link } from "@tanstack/react-router";
import { CodeRain } from "@/components/site/CodeRain";
import { Reveal } from "@/components/site/Reveal";
import { Sparkles, Trophy, Users, CalendarClock } from "lucide-react";
import { events } from "@/lib/events";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Interschool Arena 2026 — Six Events. One Arena." },
      {
        name: "description",
        content:
          "A one-day inter-school competition across Quiz, Film Making, Ad Shoot, Surprise, Online Gaming and Pitch. Free entry, live leaderboard. Register your school.",
      },
      { property: "og:title", content: "Interschool Arena 2026" },
      {
        property: "og:description",
        content: "Six events, one arena. Quiz, film, ads, gaming, pitch — and one mystery challenge.",
      },
    ],
  }),
  component: Index,
});

const stats = [
  { icon: Users, value: "48", label: "teams" },
  { icon: Sparkles, value: "6", label: "events" },
  { icon: Trophy, value: "₹2L", label: "prize pool" },
  { icon: CalendarClock, value: "12h", label: "one day" },
];

const highlights = [
  {
    title: "one_leaderboard",
    body: "Every event feeds a single school standing. Win a category or grind points across all six — both paths reach the podium.",
  },
  {
    title: "judged_live",
    body: "Industry judges, on-stage finals and results announced the same evening. No waiting weeks for a verdict.",
  },
  {
    title: "built_for_students",
    body: "No prior competition experience needed. Briefs are handed out on the day and mentors stay on the floor throughout.",
  },
];

function Index() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border/60">
        <CodeRain />
        <div className="grid-drift pointer-events-none absolute inset-0 opacity-70" />
        <div className="relative mx-auto max-w-6xl px-5 py-28 md:py-40">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-secondary">
              // inter-school competition 2026
            </p>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="mt-6 text-5xl font-bold leading-[0.95] md:text-8xl">
              <span className="text-primary neon-text">SIX EVENTS.</span>
              <br />
              ONE ARENA
              <span className="caret text-secondary">_</span>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
              One day. Six events. Quiz, film, advertising, gaming, pitching — and one challenge
              nobody sees coming. Bring your school. Take the arena.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/register"
                className="glitch border border-primary bg-primary/10 px-7 py-3 font-mono text-xs uppercase tracking-[0.25em] text-primary transition-shadow hover:shadow-[var(--glow-primary)]"
              >
                register_team
              </Link>
              <Link
                to="/tracks"
                className="glitch border border-secondary/60 px-7 py-3 font-mono text-xs uppercase tracking-[0.25em] text-secondary transition-shadow hover:shadow-[var(--glow-secondary)]"
              >
                view_events
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-border/60 bg-card/30">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-5 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 70}>
              <div className="py-10 text-center">
                <s.icon className="mx-auto h-5 w-5 text-secondary" />
                <p className="mt-3 font-mono text-3xl font-bold text-primary">{s.value}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-bold md:text-4xl">
              <span className="text-primary">$</span> ls events/
            </h2>
            <Link to="/tracks" className="glitch font-mono text-xs uppercase tracking-widest text-secondary">
              all_events →
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {events.map((e, i) => (
            <Reveal key={e.slug} delay={i * 70}>
              <Link
                to="/events/$slug"
                params={{ slug: e.slug }}
                className="glow-card block h-full rounded-md p-6 transition-transform hover:-translate-y-1"
              >
                <e.icon className="h-6 w-6 text-primary" />
                <h3 className="mt-4 font-mono text-lg text-foreground">{e.name}</h3>
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
      </section>

      <section className="border-t border-border/60 bg-card/20">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <Reveal>
            <h2 className="text-3xl font-bold md:text-4xl">
              <span className="text-primary">$</span> whoami
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Interschool Arena is a student-run competition hosted by the school's culture and tech
              societies. Teams from across the city go head-to-head on stage, on set and on screen.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 90}>
                <article className="glow-card h-full rounded-md p-7">
                  <h3 className="font-mono text-lg text-primary">{h.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{h.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-5 py-24 text-center">
          <Reveal>
            <h2 className="text-3xl font-bold md:text-5xl">
              Ready to <span className="text-secondary">take the floor?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              Registration is free and open to every participating school. Pick your events and put
              a team together.
            </p>
            <Link
              to="/register"
              className="glitch mt-9 inline-block border border-primary bg-primary/10 px-9 py-3 font-mono text-xs uppercase tracking-[0.25em] text-primary transition-shadow hover:shadow-[var(--glow-primary)]"
            >
              register_team
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
