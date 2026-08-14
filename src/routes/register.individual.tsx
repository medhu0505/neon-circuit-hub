import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { Field, SelectField, TextArea } from "@/components/site/Field";
import { events } from "@/lib/events";

export const Route = createFileRoute("/register/individual")({
  head: () => ({
    meta: [
      { title: "Register as an Individual — Quantum v2.0" },
      {
        name: "description",
        content:
          "Enter Quantum v2.0 solo. Pick your events and get slotted into a team on the day — free entry for every participating student.",
      },
      { property: "og:title", content: "Register as an Individual — Quantum v2.0" },
      {
        property: "og:description",
        content: "Solo entry for Quantum v2.0 — pick your events and we'll do the rest.",
      },
      { property: "og:url", content: "/register/individual" },
    ],
    links: [{ rel: "canonical", href: "/register/individual" }],
  }),
  component: IndividualPage,
});

const eventOptions = events.map((e) => ({ value: e.slug, label: e.name }));

const notes = [
  "Solo entrants are placed into teams on the morning of the event.",
  "You may pick a second event as long as the timings don't clash.",
  "Carry your school ID — it's checked at the registration desk.",
  "No entry fee. Lunch and refreshments are provided.",
];

function IndividualPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHero>
        <Reveal>
          <Link
            to="/register"
            className="glitch font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary"
          >
            ← back to options
          </Link>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-secondary">
            // individual entry
          </p>
          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            Register as an <span className="wordmark">individual</span>
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Draft form — submissions are not stored yet. Final registration opens once the event
            date is confirmed.
          </p>
        </Reveal>
      </PageHero>

      <div className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="glow-card rounded-md p-7"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="name" placeholder="A. Student" />
                <Field label="class" placeholder="11-B" />
                <Field label="school" placeholder="Placeholder Public School" />
                <Field label="phone_no" type="tel" placeholder="+91 90000 00000" />
                <Field label="email" type="email" placeholder="student@school.edu" />
                <SelectField label="event" options={eventOptions} />
              </div>
              <div className="mt-5">
                <TextArea
                  label="other_events"
                  placeholder="Any additional events you want to enter, one per line"
                  rows={3}
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
              <h2 className="font-mono text-lg text-secondary">solo_notes.md</h2>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {notes.map((n) => (
                  <li key={n} className="flex gap-3">
                    <span className="font-mono text-primary">›</span>
                    {n}
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-mono text-xs text-muted-foreground">
                bringing a whole contingent?{" "}
                <Link to="/register/school" className="glitch text-primary">
                  register your school →
                </Link>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
