import { useState } from "react";
import { faqs } from "@/lib/faq";
import { Reveal } from "./Reveal";

/**
 * Accordion of frequently asked questions. All cards start collapsed and the
 * whole card is the toggle. Content lives in src/lib/faq.ts.
 */
export function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  const [touched, setTouched] = useState(false);

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <Reveal key={f.q} delay={i * 50}>
            <button
              type="button"
              onClick={() => {
                setTouched(true);
                setOpen(isOpen ? null : i);
              }}
              aria-expanded={isOpen}
              className="glow-card block h-full w-full overflow-hidden rounded-xl text-left transition-colors duration-300 hover:border-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            >
              <span className="flex w-full items-start justify-between gap-4 px-6 py-5">
                <span className="display-face text-base tracking-[0.02em] text-foreground">
                  {f.q}
                  {i === 0 && !touched && (
                    <span className="pulse ml-3 inline-block rounded-full border border-secondary/60 px-2 py-0.5 align-middle font-mono text-[9px] uppercase tracking-[0.25em] text-secondary">
                      click me
                    </span>
                  )}
                </span>
                <span
                  className={`mt-0.5 shrink-0 font-mono text-secondary transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                  aria-hidden="true"
                >
                  +
                </span>
              </span>
              <span
                className="grid transition-[grid-template-rows] duration-300 ease-out"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", display: "grid" }}
              >
                <span className="overflow-hidden">
                  <span className="block px-6 pb-5 text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </span>
                </span>
              </span>
            </button>
          </Reveal>
        );
      })}
    </div>
  );
}
