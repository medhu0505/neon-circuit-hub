import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Sparkles, ChevronDown } from "lucide-react";
import { RegisterNowButton } from "./RegisterChoice";

const links = [
  { to: "/", label: "home" },
  { to: "/", label: "about", hash: "about" },
  { to: "/events", label: "events" },
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
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <div ref={logoRef} className="relative">
          <button
            type="button"
            onClick={() => setLogoOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={logoOpen}
            className="glitch flex items-center gap-2 text-lg tracking-tight"
          >
            <Sparkles className="h-4 w-4 text-secondary" />
            <span className="wordmark text-xl">QUANTUM</span>
            <span className="font-mono text-[11px] text-muted-foreground">v2.0</span>
            <ChevronDown
              className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${
                logoOpen ? "rotate-180 text-primary" : ""
              }`}
            />
          </button>

          {logoOpen && (
            <div
              role="menu"
              className="noise absolute left-0 top-full mt-3 w-52 border border-border/70 bg-card/95 py-2 shadow-[var(--glow-primary)] backdrop-blur-md"
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
          {links.map((l) => (
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
          <RegisterNowButton className="glitch border border-primary/60 px-4 py-2 font-mono text-xs uppercase tracking-widest text-primary transition-shadow hover:shadow-[var(--glow-primary)]" />
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
        <div className="flex flex-col gap-1 border-t border-border/70 px-5 py-3 md:hidden">
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
