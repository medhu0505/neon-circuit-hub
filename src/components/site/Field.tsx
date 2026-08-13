const inputClass =
  "mt-2 w-full rounded-sm border border-input bg-background/60 px-3 py-2 font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground/50 focus:border-primary/70 focus:shadow-[var(--glow-primary)]";

export function Field({
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
      <input type={type} placeholder={placeholder} className={inputClass} />
    </div>
  );
}

export function TextArea({
  label,
  placeholder,
  rows = 4,
}: {
  label: string;
  placeholder: string;
  rows?: number;
}) {
  return (
    <div>
      <label className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <textarea rows={rows} placeholder={placeholder} className={inputClass} />
    </div>
  );
}

export function SelectField({
  label,
  options,
}: {
  label: string;
  options: readonly { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <select className={inputClass} defaultValue="">
        <option value="" disabled>
          select…
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
