import type { LeadMagnetConfig } from "@/content/leadMagnets/types";
import { FieldReportTag } from "./FieldReportTag";

export function CalloutSection({ config }: { config: LeadMagnetConfig }) {
  const callout = config.callout;
  if (!callout) return null;
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4">
        <div className="relative border-2 border-brand-green bg-panel-cream p-6 shadow-[6px_6px_0_0_var(--brand-green)] sm:p-10">
          <div className="pointer-events-none absolute inset-2 border border-brand-brown/30" />
          <div className="relative">
            {callout.eyebrow && (
              <FieldReportTag>{callout.eyebrow}</FieldReportTag>
            )}
            <h2 className="mt-3 font-display text-3xl uppercase leading-tight text-brand-green sm:text-4xl">
              {callout.heading}
            </h2>
            <ul className="mt-6 space-y-2">
              {callout.lines.map((line, i) => (
                <li
                  key={i}
                  className="font-display text-xl uppercase leading-tight text-brand-red sm:text-2xl"
                >
                  {line}
                </li>
              ))}
            </ul>
            {callout.closingLine && (
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/85 sm:text-lg">
                {callout.closingLine}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}