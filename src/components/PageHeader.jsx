export default function PageHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-start justify-between gap-4 px-8 pt-8 pb-6 border-b border-[var(--color-line)]">
      <div>
        <h1 className="font-display text-3xl text-[var(--color-ink)]">{title}</h1>
        {subtitle && <p className="text-sm text-[var(--color-ink)]/55 mt-1.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
