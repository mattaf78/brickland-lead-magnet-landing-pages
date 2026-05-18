import { FieldReportTag } from "./FieldReportTag";

export function Navbar({ brandName, fieldReportLabel, leadMagnetId, logoMonogram = "WB", ctaLabel = "Get the Guide" }: { brandName: string; fieldReportLabel: string; leadMagnetId: string; logoMonogram?: string; ctaLabel?: string }) {
  return (
    <header className="sticky top-0 z-30 border-b-2 border-brand-green/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <a href="#top" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center bg-brand-green text-panel-cream font-display text-lg">{logoMonogram}</span>
          <span className="hidden sm:inline font-display text-base uppercase leading-tight text-brand-green sm:text-lg">{brandName}</span>
        </a>
        <FieldReportTag className="hidden md:inline-flex">
          {fieldReportLabel} · {leadMagnetId}
        </FieldReportTag>
        <a
          href="#final-cta"
          className="inline-flex shrink-0 h-10 items-center bg-brand-red px-4 font-display text-sm uppercase tracking-wider text-panel-cream transition-transform hover:-translate-y-0.5"
        >
          {ctaLabel}
        </a>
      </div>
    </header>
  );
}
