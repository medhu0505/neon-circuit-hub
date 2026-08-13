import { createFileRoute, Link } from "@tanstack/react-router";
import { CodeRain } from "@/components/site/CodeRain";
import { Reveal } from "@/components/site/Reveal";
import { Clapperboard, Sparkles, Trophy, Users } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Quantum 2026 — Inter-School Tech & Culture Fest" },
      {
        name: "description",
        content:
          "Quantum 2026 — the inter-school fest with six events: Quiz, Film Making, Ad Shoot, Surprise, Online Gaming and Pitch. Free entry, live scoring, one stage.",
      },
      { property: "og:title", content: "Quantum 2026" },
      {
        property: "og:description",
        content: "Six events. One stage. The inter-school fest returns as Quantum 2026.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const stats = [
  { icon: Users, value: "48", label: "teams" },
  { icon: Clapperboard, value: "6", label: "events" },
  { icon: Trophy, value: "₹2L", label: "prize pool" },
  { icon: Sparkles, value: "2d", label: "runtime" },
];

const highlights = [
  {
    title: "six formats",
    body: "From rapid-fire trivia to a full short-film shoot — six independent events, each with its own panel and scoring.",
  },
  {
    title: "live scoreboard",
    body: "Real-time school standings across every event, with a final-hour freeze that keeps the ending unreadable.",
  },
  {
    title: "school first",
    body: "Built for students entering their first fest — clear briefs, on-floor coordinators and no entry fee.",
  },
];

function Index() {
  return (
    <>
      <section className="noise relative overflow-hidden border-b border-border/60">
        <CodeRain />
        <div className="grid-drift pointer-events-none absolute inset-0 opacity-70" />
        <div className="pointer-events-none absolute left-5 top-10 h-16 w-16 border-l border-t border-dashed border-secondary/30" />
        <div className="pointer-events-none absolute bottom-10 right-5 h-16 w-16 border-b border-r border-dashed border-primary/30" />
        <div className="pointer-events-none absolute right-16 top-16 h-1.5 w-1.5 rounded-full bg-secondary/60" />
        <div className="relative mx-auto max-w-6xl px-5 py-28 md:py-40">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-secondary">
              // inter-school tech & culture fest
            </p>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="rgb-split mt-6 text-6xl leading-[0.9] md:text-9xl">
              <span className="wordmark">QUANTUM</span>
              <span className="ml-3 font-mono text-2xl text-secondary md:text-4xl">2026</span>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
              Two days. Six events. One stage. Quiz, film, advertising, gaming, pitching — and one
              challenge nobody sees coming.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/register"
                className="glitch border border-primary bg-primary/10 px-7 py-3 font-mono text-xs uppercase tracking-[0.25em] text-primary transition-shadow hover:shadow-[var(--glow-primary)]"
              >
                register team
              </Link>
              <Link
                to="/events"
                className="glitch border border-secondary/60 px-7 py-3 font-mono text-xs uppercase tracking-[0.25em] text-secondary transition-shadow hover:shadow-[var(--glow-secondary)]"
              >
                view events
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="noise border-b border-border/60 bg-card/30">
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
          <h2 className="text-3xl font-bold md:text-4xl">
            <span className="text-secondary">//</span> about quantum
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Quantum is a student-run inter-school fest, returning after Quantum 2.0. Teams from
            across the city go head-to-head across six creative and competitive events, all run and
            judged on the day.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {highlights.map((h, i) => (
            <Reveal key={h.title} delay={i * 90}>
              <article className="glow-card h-full rounded-md p-7">
                <h3 className="text-xl font-bold tracking-tight text-primary">{h.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{h.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="noise border-t border-border/60">
        <div className="mx-auto max-w-6xl px-5 py-24 text-center">
          <Reveal>
            <h2 className="text-3xl font-bold md:text-5xl">
              Ready to <span className="text-secondary">compete</span>?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              Registration is free and open to every participating school. Bring a crew and a
              stubborn streak.
            </p>
            <Link
              to="/register"
              className="glitch mt-9 inline-block border border-primary bg-primary/10 px-9 py-3 font-mono text-xs uppercase tracking-[0.25em] text-primary transition-shadow hover:shadow-[var(--glow-primary)]"
            >
              register team
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
