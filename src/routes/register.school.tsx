import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { Field, SelectField, TextArea } from "@/components/site/Field";
import { events } from "@/lib/events";

export const Route = createFileRoute("/register/school")({
  head: () => ({
    meta: [
      { title: "Register a School — Quantum v2.0" },
      {
        name: "description",
        content:
          "Register your school contingent for Quantum v2.0 across Quiz, Film Making, Ad Shoot, Surprise, Online Gaming and Pitch. Entry rules and eligibility.",
      },
      { property: "og:title", content: "Register a School — Quantum v2.0" },
      {
        property: "og:description",
        content: "Free entry for all participating schools across six events.",
      },
      { property: "og:url", content: "/register/school" },
    ],
    links: [{ rel: "canonical", href: "/register/school" }],
  }),
  component: SchoolPage,
});

const eventOptions = events.map((e) => ({ value: e.slug, label: e.name }));

const rules = [
  "Team sizes vary by event — check the event page before entering.",
  "All members of a team must be from the same school.",
  "One accompanying teacher or coordinator per school.",
  "Entries may be capped per school if slots fill up.",
  "Judges' decisions are final across every event.",
];

function SchoolPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-6xl px-5 py-20">
      <Reveal>
        <Link
          to="/register"
          className="glitch font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary"
        >
          ← back to options
        </Link>
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-secondary">
          // school entry
        </p>
        <h1 className="mt-4 text-4xl font-bold md:text-5xl">
          Register your <span className="wordmark">school</span>
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
              <Field label="school_name" placeholder="Placeholder Public School" />
              <Field label="city" placeholder="Placeholder City" />
              <Field label="coordinator_name" placeholder="Ms. Placeholder" />
              <Field label="coordinator_email" type="email" placeholder="coordinator@school.edu" />
              <Field label="coordinator_phone" type="tel" placeholder="+91 90000 00000" />
              <SelectField label="lead_event" options={eventOptions} />
            </div>
            <div className="mt-5">
              <TextArea
                label="teams"
                placeholder={"One team per line — event, team name, member count"}
              />
            </div>
            <button
              type="submit"
              className="glitch mt-6 w-full border border-primary bg-primary/10 px-5 py-3 font-mono text-xs uppercase tracking-[0.25em] text-primary transition-shadow hover:shadow-[var(--glow-primary)]"
            >
              {sent ? "// received — we'll be in touch" : "submit registration"}
            </button>
          </form>
        </Reveal>

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
            <p className="mt-6 font-mono text-xs text-muted-foreground">
              entering on your own?{" "}
              <Link to="/register/individual" className="glitch text-primary">
                register as an individual →
              </Link>
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
