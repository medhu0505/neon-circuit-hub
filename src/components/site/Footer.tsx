import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-card/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 font-mono text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>
          <span className="text-primary">$</span> interschool_arena --year 2026{" "}
          <span className="caret text-primary">_</span>
        </p>
        <div className="flex gap-6">
          <Link to="/tracks" className="glitch hover:text-primary">
            events
          </Link>
          <Link to="/register" className="glitch hover:text-primary">
            register
          </Link>
          <a href="mailto:arena@example.org" className="glitch hover:text-primary">
            arena@example.org
          </a>
        </div>
        <p className="text-muted-foreground/60">draft build // placeholder branding</p>
      </div>
    </footer>
  );
}