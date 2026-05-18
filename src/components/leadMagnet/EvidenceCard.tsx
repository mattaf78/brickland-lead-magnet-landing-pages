import type { Card } from "@/content/leadMagnets/types";

export function EvidenceCard({ card, index }: { card: Card; index: number }) {
  return (
    <div className="relative bg-panel-cream text-foreground border-2 border-brand-green/80">
      <div className="pointer-events-none absolute inset-1.5 border border-brand-brown/40" />
      <div className="absolute -top-3 left-4 flex h-9 w-9 items-center justify-center rounded-sm bg-brand-green text-panel-cream font-display text-lg shadow-[2px_2px_0_0_rgba(0,0,0,0.15)]">
        {String(index).padStart(2, "0")}
      </div>
      <div className="relative p-5 pt-7 sm:p-6 sm:pt-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-red">{card.label}</div>
        <h3 className="mt-2 font-display text-2xl uppercase leading-tight text-brand-green">{card.title}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-foreground/85">{card.body}</p>
      </div>
    </div>
  );
}
