export function ClassificationBar({ text }: { text: string }) {
  return (
    <div className="w-full bg-brand-brown text-panel-cream">
      <div className="mx-auto max-w-7xl px-4 py-1.5">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-center sm:text-left">{text}</p>
      </div>
    </div>
  );
}
