import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Register a Team — Interschool CTF 2026" },
      {
        name: "description",
        content:
          "Register a team of up to four students for Interschool CTF 2026. Entry rules, eligibility and contact details for participating schools.",
      },
      { property: "og:title", content: "Register a Team — Interschool CTF 2026" },
      {
        property: "og:description",
        content: "Teams of up to four students. Free entry for all participating schools.",
      },
    ],
  }),
  component: RegisterPage,
});

const rules = [
  "Teams of up to four students from the same school.",
  "One accompanying teacher or coordinator per school.",
  "No attacking the scoring infrastructure or other teams.",
  "Flag sharing between teams means instant disqualification.",
  "Open-source tooling and the public internet are fair game.",
];

const faqs = [
  ["Do we need prior CTF experience?", "No. Each track has entry-level challenges and a guided warm-up set."],
  ["What should we bring?", "One laptop per participant, chargers, and a Linux VM if you have one."],
  ["Is there an entry fee?", "No. Participation is free; lunch and refreshments are provided."],
] as const;

function RegisterPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-6xl px-5 py-20">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-secondary">// enrolment</p>
        <h1 className="mt-4 text-4xl font-bold md:text-5xl">
          Register your <span className="text-primary neon-text">team</span>
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Draft form — submissions are not stored yet. Final registration opens once the event date
          is confirmed.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="glow-card rounded-md p-7"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="team_name" placeholder="null_terminators" />
              <Field label="school" placeholder="Placeholder Public School" />
              <Field label="captain_name" placeholder="A. Student" />
              <Field label="email" type="email" placeholder="captain@school.edu" />
            </div>
            <div className="mt-5">
              <label className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                members
              </label>
              <textarea
                rows={4}
                placeholder="One name per line (max 4)"
                className="mt-2 w-full rounded-sm border border-input bg-background/60 px-3 py-2 font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground/50 focus:border-primary/70 focus:shadow-[var(--glow-primary)]"
              />
            </div>
            <button
              type="submit"
              className="glitch mt-6 w-full border border-primary bg-primary/10 px-5 py-3 font-mono text-xs uppercase tracking-[0.25em] text-primary transition-shadow hover:shadow-[var(--glow-primary)]"
            >
              {sent ? "// received — we'll be in touch" : "submit_registration"}
            </button>
          </form>
        </Reveal>

        <div className="space-y-8">
          <Reveal delay={80}>
            <div className="glow-card rounded-md p-7">
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

          <Reveal delay={140}>
            <div className="glow-card rounded-md p-7">
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
                <a href="mailto:ctf@example.org" className="glitch text-primary">
                  ctf@example.org
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-sm border border-input bg-background/60 px-3 py-2 font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground/50 focus:border-primary/70 focus:shadow-[var(--glow-primary)]"
      />
    </div>
  );
}