import type { LeadMagnetConfig } from "@/content/leadMagnets/types";

export function Footer({ config }: { config: LeadMagnetConfig }) {
  return (
    <footer className="border-t-2 border-brand-green/80 bg-brand-brown text-panel-cream">
      <div className="mx-auto max-w-7xl space-y-4 px-4 py-10">
        <p className="font-display text-xl uppercase tracking-wide text-panel-cream">{config.footer.brandName}</p>
        <p className="max-w-3xl text-sm text-panel-cream/90">{config.footer.fictionDisclaimer}</p>
        <p className="max-w-3xl text-sm text-panel-cream/90">{config.footer.noBrandsLine}</p>
        <div className="border-t border-panel-cream/30 pt-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brick-yellow">Disclaimer</p>
          <p className="mt-2 max-w-4xl text-xs leading-relaxed text-panel-cream/85">
            {config.footer.medicalDisclaimer}
          </p>
        </div>
        <p className="pt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-panel-cream/70">
          © {new Date().getFullYear()} {config.footer.brandName} · Educational content only · Not medical advice
        </p>
      </div>
    </footer>
  );
}
