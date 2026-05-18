export function FieldReportTag({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-brown ${className}`}
    >
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-red" />
      {children}
    </span>
  );
}
