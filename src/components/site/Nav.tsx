import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Sparkles, ChevronDown } from "lucide-react";
import { RegisterNowButton } from "./RegisterChoice";

const links = [
  { to: "/", label: "home" },
  { to: "/", label: "about", hash: "about" },
  { to: "/events", label: "events" },
  { to: "/", label: "team", hash: "team" },
  { to: "/register", label: "register" },
] as const satisfies readonly { to: string; label: string; hash?: string }[];

/** `exactOptionalPropertyTypes` forbids passing `hash={undefined}`, so spread it instead. */
const hashProp = (l: (typeof links)[number]) => ("hash" in l ? { hash: l.hash } : {});

export function Nav() {
  const [open, setOpen] = useState(false);
  const [logoOpen, setLogoOpen] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!logoOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!logoRef.current?.contains(e.target as Node)) setLogoOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLogoOpen(false);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [logoOpen]);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 md:px-5 md:pt-5">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-border/70 bg-background/70 px-5 py-3 backdrop-blur-xl md:px-7">
        <div ref={logoRef} className="relative">
          <button
            type="button"
            onClick={() => setLogoOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={logoOpen}
            className="glitch display-face flex items-center gap-2 text-lg tracking-[0.14em]"
          >
            <Sparkles className="h-4 w-4 text-secondary" />
            <span className="text-lg font-bold text-foreground">QUANTUM</span>
            <span className="text-sm text-secondary">V2.0</span>
            <ChevronDown
              className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${
                logoOpen ? "rotate-180 text-primary" : ""
              }`}
            />
          </button>

          {logoOpen && (
            <div
              role="menu"
              className="noise absolute left-0 top-full mt-4 w-52 overflow-hidden rounded-2xl border border-border/70 bg-card/95 py-2 shadow-[var(--glow-primary)] backdrop-blur-xl"
            >
              {links.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  {...hashProp(l)}
                  role="menuitem"
                  onClick={() => setLogoOpen(false)}
                  className="block px-4 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  <span className="text-secondary">›</span> {l.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="hidden items-center gap-8 md:flex">
          {/* register lives in the pill button, so it is not repeated inline */}
          {links
            .filter((l) => l.label !== "register")
            .map((l) => (
              <Link
                key={l.label}
                to={l.to}
                {...hashProp(l)}
                className="glitch font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
                activeProps={{ className: "text-primary" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          <RegisterNowButton className="pill border border-secondary/70 px-6 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-secondary hover:border-secondary hover:shadow-[var(--glow-secondary)]">
            register
          </RegisterNowButton>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="text-primary md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-2xl border border-border/70 bg-card/95 px-5 py-3 backdrop-blur-xl md:hidden">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              {...hashProp(l)}
              onClick={() => setOpen(false)}
              className="py-2 font-mono text-sm uppercase tracking-widest text-muted-foreground hover:text-primary"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
