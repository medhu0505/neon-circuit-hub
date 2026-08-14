import { createFileRoute, Link } from "@tanstack/react-router";
import { CodeRain } from "@/components/site/CodeRain";
import { ShaderField } from "@/components/site/ShaderField";
import { Reveal } from "@/components/site/Reveal";
import { Clapperboard, Sparkles, Trophy, Users } from "lucide-react";
import { RegisterNowButton } from "@/components/site/RegisterChoice";
import { Orrery } from "@/components/site/Orrery";
import { ClientOnly } from "@/components/site/ClientOnly";
import { TeamGrid } from "@/components/site/TeamGrid";
import { Tilt } from "@/components/site/Tilt";
import { Parallax } from "@/components/site/Parallax";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Quantum v2.0 — Inter-School Tech & Culture Fest" },
      {
        name: "description",
        content:
          "Quantum v2.0 — the inter-school fest with six events: Quiz, Film Making, Ad Shoot, Surprise, Online Gaming and Pitch. Free entry, live scoring, one stage.",
      },
      { property: "og:title", content: "Quantum v2.0" },
      {
        property: "og:description",
        content: "Six events. One stage. The inter-school fest returns as Quantum v2.0.",
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
        <ShaderField object />
        <CodeRain />
        <div className="grid-drift pointer-events-none absolute inset-0 opacity-70" />
        <div className="pointer-events-none absolute left-5 top-10 h-16 w-16 border-l border-t border-dashed border-secondary/30" />
        <div className="pointer-events-none absolute bottom-10 right-5 h-16 w-16 border-b border-r border-dashed border-primary/30" />
        <div className="pointer-events-none absolute right-16 top-16 h-1.5 w-1.5 rounded-full bg-secondary/60" />
        <div className="relative mx-auto max-w-6xl px-5 pb-28 pt-36 md:pb-40 md:pt-44">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
              Air Force Bal Bharati School <span className="text-secondary">·</span> inter-school
              event
            </p>
          </Reveal>
          <Reveal delay={90}>
            <Parallax speed={-0.18}>
              <h1 className="mt-7 leading-[0.82]">
                <span className="wordmark block text-6xl md:text-[8.5rem]">QUANTUM</span>
                <span className="outline-text block text-5xl md:text-[7rem]">V2.0</span>
              </h1>
            </Parallax>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-9 max-w-xl text-base leading-relaxed text-muted-foreground">
              Two days. Six events. One stage. Quiz, film, advertising, gaming, pitching — and one
              challenge nobody sees coming.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <RegisterNowButton className="pill-solid px-8 py-3.5 font-mono text-xs uppercase tracking-[0.25em]" />
              <Link
                to="/events"
                className="glitch pill border border-border/80 px-8 py-3.5 font-mono text-xs uppercase tracking-[0.25em] text-foreground hover:border-secondary/70 hover:shadow-[var(--glow-secondary)]"
              >
                explore events
              </Link>
            </div>
          </Reveal>
          <Reveal delay={340}>
            <div className="mt-16 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground/70">
              <span className="scroll-cue inline-block">↓</span> scroll
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
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
            the event universe
          </p>
          <h2 className="mt-5 text-4xl font-bold uppercase leading-[0.95] md:text-6xl">
            <span className="block text-foreground">Six formats.</span>
            <span className="wordmark block">One arena.</span>
          </h2>
        </Reveal>
        <Reveal delay={90}>
          <div className="mt-12">
            <ClientOnly
              fallback={
                <div className="glass-pane aspect-square w-full rounded-3xl sm:aspect-[4/3] lg:aspect-[16/9]" />
              }
            >
              <Orrery />
            </ClientOnly>
          </div>
        </Reveal>
      </section>

      <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
            what is quantum?
          </p>
          <h2 className="mt-5 text-4xl font-bold uppercase leading-[0.95] md:text-6xl">
            <span className="block text-foreground">Where ideas</span>
            <span className="wordmark block">collide.</span>
          </h2>
          <p className="mt-8 max-w-2xl text-muted-foreground">
            Quantum is a student-run inter-school fest, running as Quantum v2.0. Teams from across
            the city go head-to-head across six creative and competitive events, all run and judged
            on the day.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {highlights.map((h, i) => (
            <Reveal key={h.title} delay={i * 90}>
              <Tilt className="h-full">
                <article className="glow-card h-full rounded-xl p-7">
                  <h3 className="text-xl font-bold tracking-tight text-primary">{h.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{h.body}</p>
                </article>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="team" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
            meet the team
          </p>
          <h2 className="mt-5 text-4xl font-bold uppercase leading-[0.95] md:text-6xl">
            <span className="block text-foreground">The people</span>
            <span className="wordmark block">behind it.</span>
          </h2>
          <p className="mt-8 max-w-2xl text-muted-foreground">
            The students and staff running Quantum V2.0 on the day.
          </p>
        </Reveal>
        <div className="mt-16">
          <TeamGrid />
        </div>
      </section>

      <section className="noise border-t border-border/60">
        <div className="mx-auto max-w-6xl px-5 py-24 text-center">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
              experience the quantum
            </p>
            <h2 className="mt-5 text-4xl font-bold uppercase leading-[0.95] md:text-6xl">
              <span className="text-foreground">Explore. </span>
              <span className="wordmark">Compete. Create.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              Registration is free and open to every participating school. Bring a crew and a
              stubborn streak.
            </p>
            <RegisterNowButton className="pill-solid mt-10 inline-block px-10 py-4 font-mono text-xs uppercase tracking-[0.25em]" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
