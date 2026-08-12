import { createFileRoute, Link } from "@tanstack/react-router";
import { CodeRain } from "@/components/site/CodeRain";
import { Reveal } from "@/components/site/Reveal";
import { Flag, ShieldHalf, Trophy, Users } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Interschool CTF 2026 — Inter-School Hacking Competition" },
      {
        name: "description",
        content:
          "A 12-hour jeopardy-style capture-the-flag for school teams. Six tracks, live scoreboard, zero entry fee. Register your team for Interschool CTF 2026.",
      },
      { property: "og:title", content: "Interschool CTF 2026" },
      {
        property: "og:description",
        content: "A 12-hour inter-school capture-the-flag competition. Six tracks, live scoreboard.",
      },
    ],
  }),
  component: Index,
});

const stats = [
  { icon: Users, value: "48", label: "teams" },
  { icon: Flag, value: "60+", label: "flags" },
  { icon: Trophy, value: "₹2L", label: "prize pool" },
  { icon: ShieldHalf, value: "12h", label: "runtime" },
];

const highlights = [
  {
    title: "jeopardy_format",
    body: "Independent challenges across six categories with dynamic scoring that decays as more teams solve.",
  },
  {
    title: "live_scoreboard",
    body: "Real-time standings, first-blood callouts and a final-hour freeze that keeps the ending unreadable.",
  },
  {
    title: "school_first",
    body: "Built for students with no prior CTF experience — guided warm-ups, a hint store and on-floor mentors.",
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
              // inter-school capture the flag
            </p>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="mt-6 text-5xl font-bold leading-[0.95] md:text-8xl">
              <span className="text-primary neon-text">INTERSCHOOL</span>
              <br />
              CTF_2026
              <span className="caret text-secondary">_</span>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
              Twelve hours. Six tracks. One scoreboard. Break the box, read the packet, own the
              binary — then plant your flag before the freeze.
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
                view_tracks
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
          <h2 className="text-3xl font-bold md:text-4xl">
            <span className="text-primary">$</span> whoami
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Interschool CTF is a student-run security competition hosted by the school computing
            club. Teams of up to four go head-to-head on live infrastructure built and broken by
            students.
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
      </section>

      <section className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-5 py-24 text-center">
          <Reveal>
            <h2 className="text-3xl font-bold md:text-5xl">
              Ready to <span className="text-secondary">exploit</span> something?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              Registration is free and open to every participating school. Bring a laptop and a
              stubborn streak.
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
