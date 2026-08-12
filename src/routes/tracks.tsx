import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { Binary, Bug, Globe, KeyRound, Radar, Search } from "lucide-react";

export const Route = createFileRoute("/tracks")({
  head: () => ({
    meta: [
      { title: "Challenge Tracks — Interschool CTF 2026" },
      {
        name: "description",
        content:
          "Six capture-the-flag tracks: web exploitation, cryptography, reverse engineering, forensics, OSINT and pwn. Full event timeline and scoring rules.",
      },
      { property: "og:title", content: "Challenge Tracks — Interschool CTF 2026" },
      {
        property: "og:description",
        content: "Web, crypto, reversing, forensics, OSINT and pwn tracks with a 12-hour timeline.",
      },
    ],
  }),
  component: TracksPage,
});

const tracks = [
  {
    icon: Globe,
    name: "web_exploitation",
    level: "beginner → hard",
    desc: "Injection, broken auth, SSRF and client-side trickery on purpose-built sandbox apps.",
  },
  {
    icon: KeyRound,
    name: "cryptography",
    level: "medium",
    desc: "Classical ciphers, weak RNGs, padding oracles and misused primitives.",
  },
  {
    icon: Binary,
    name: "reverse_engineering",
    level: "hard",
    desc: "Static and dynamic analysis of stripped binaries, obfuscated bytecode and firmware blobs.",
  },
  {
    icon: Search,
    name: "forensics",
    level: "beginner",
    desc: "Packet captures, carved disk images, steganography and corrupted file recovery.",
  },
  {
    icon: Radar,
    name: "osint",
    level: "beginner",
    desc: "Trace a fictional persona across archived pages, metadata and public records.",
  },
  {
    icon: Bug,
    name: "pwn",
    level: "expert",
    desc: "Stack smashing, format strings and heap grooming against remote services.",
  },
];

const timeline = [
  ["08:30", "Check-in & rig setup", "Teams verify accounts on the scoreboard."],
  ["09:00", "Rules brief + warm-up flag", "One free flag to test your tooling."],
  ["09:30", "Round 1 opens", "All six tracks unlock. Dynamic scoring begins."],
  ["13:00", "Mid-game surge", "Hint store opens; late-release challenges drop."],
  ["18:00", "Scoreboard freeze", "Last hour runs blind. No standings shown."],
  ["19:00", "Flags close & prize giving", "Top three teams present their best solve."],
] as const;

function TracksPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-20">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-secondary">
          // categories
        </p>
        <h1 className="mt-4 text-4xl font-bold md:text-5xl">
          Six tracks. <span className="text-primary neon-text">One scoreboard.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Challenges are jeopardy-style with dynamic scoring — the more teams solve a task, the
          fewer points it awards. Difficulty labels are indicative for a school-level field.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {tracks.map((t, i) => (
          <Reveal key={t.name} delay={i * 70}>
            <article className="glow-card h-full rounded-md p-6">
              <t.icon className="h-6 w-6 text-primary" />
              <h2 className="mt-4 font-mono text-lg text-foreground">{t.name}</h2>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-secondary">
                {t.level}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.desc}</p>
            </article>
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