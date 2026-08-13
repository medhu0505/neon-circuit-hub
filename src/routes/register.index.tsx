import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { RegisterOptions } from "@/components/site/RegisterChoice";

export const Route = createFileRoute("/register/")({
  head: () => ({
    meta: [
      { title: "Register — Quantum v2.0" },
      {
        name: "description",
        content:
          "Register for Quantum v2.0 as an individual or as a school across Quiz, Film Making, Ad Shoot, Surprise, Online Gaming and Pitch.",
      },
      { property: "og:title", content: "Register — Quantum v2.0" },
      {
        property: "og:description",
        content: "Two ways in: enter solo, or register your whole school.",
      },
      { property: "og:url", content: "/register" },
    ],
    links: [{ rel: "canonical", href: "/register" }],
  }),
  component: RegisterIndex,
});

const rules = [
  "Team sizes vary by event — check the event page before entering.",
  "All members must be from the same school.",
  "One accompanying teacher or coordinator per school.",
  "Entries may be capped per school if slots fill up.",
  "Judges' decisions are final across every event.",
];

const faqs = [
  [
    "Do we need prior experience?",
    "No. Every event has an entry-level brief and on-floor coordinators.",
  ],
  ["Can we enter more than one event?", "Yes, as long as the timings on the event pages don't clash."],
  ["What should we bring?", "School ID, chargers, and any gear your event needs (camera, peripherals)."],
  ["Is there an entry fee?", "No. Participation is free; lunch and refreshments are provided."],
] as const;

function RegisterIndex() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-20">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-secondary">// enrolment</p>
        <h1 className="mt-4 text-4xl font-bold md:text-5xl">
          How are you <span className="wordmark">entering</span>?
        </h1>
        <div className="dashed-motif mt-6 w-40" />
        <p className="mt-6 max-w-2xl text-muted-foreground">
          Pick a path below. Solo entrants get slotted into a team on the floor; school
          coordinators can enter every team under one contingent.
        </p>
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-10">
          <RegisterOptions />
        </div>
      </Reveal>

      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        <Reveal delay={120}>
          <div className="glow-card h-full rounded-md p-7">
            <h2 className="font-mono text-lg">rules.md</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {rules.map((r) => (
                <li key={r} className="flex gap-3">
                  <span className="font-mono text-primary">›</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <div className="glow-card h-full rounded-md p-7">
            <h2 className="font-mono text-lg">faq</h2>
            <dl className="mt-4 space-y-5">
              {faqs.map(([q, a]) => (
                <div key={q}>
                  <dt className="font-mono text-sm text-secondary">{q}</dt>
                  <dd className="mt-1 text-sm text-muted-foreground">{a}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 font-mono text-xs text-muted-foreground">
              queries →{" "}
              <a href="mailto:quantum@example.org" className="glitch text-primary">
                quantum@example.org
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
