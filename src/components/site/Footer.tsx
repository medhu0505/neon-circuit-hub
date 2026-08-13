import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-card/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 font-mono text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>
          <span className="wordmark text-base">QUANTUM</span> 2026 — successor to Quantum 2.0{" "}
          <span className="caret text-secondary">_</span>
        </p>
        <div className="flex gap-6">
          <Link to="/events" className="glitch hover:text-primary">
            events
          </Link>
          <Link to="/register" className="glitch hover:text-primary">
            register
          </Link>
          <a href="mailto:quantum@example.org" className="glitch hover:text-primary">
            quantum@example.org
          </a>
        </div>
        <p className="text-muted-foreground/60">draft build // placeholder branding</p>
      </div>
    </footer>
  );
}