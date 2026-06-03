import type { LeadMagnetConfig } from "@/content/leadMagnets/types";
import { FieldReportTag } from "./FieldReportTag";

export function PreviewSection({ config }: { config: LeadMagnetConfig }) {
  const sectionLabel = config.sectionLabels?.preview ?? "Inside the Report";
  const title = config.preview.title;
  // When the title is absent or identical to the section label, promote the
  // section label to the primary heading (larger, with red dot).
  const titleIsRedundant = !title || title === sectionLabel;

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        {titleIsRedundant ? (
          <h2 className="inline-flex items-center gap-3 font-display text-2xl uppercase leading-tight text-brand-green sm:text-3xl md:text-4xl">
            <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-brand-red" />
            {sectionLabel}
          </h2>
        ) : (
          <>
            <FieldReportTag>{sectionLabel}</FieldReportTag>
            <h2 className="mt-3 max-w-3xl font-display text-3xl uppercase leading-tight text-brand-green sm:text-4xl">
              {title}
            </h2>
          </>
        )}
        {config.preview.intro && (
          <p className="mt-5 max-w-3xl text-base text-foreground/85 sm:text-lg">{config.preview.intro}</p>
        )}

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {config.preview.items.map((item, i) => (
            <figure key={item.label} className="relative">
              <div className="relative border-2 border-brand-green bg-panel-cream p-2 shadow-[4px_4px_0_0_var(--brand-green)]">
                <div className="pointer-events-none absolute inset-1 border border-brand-brown/40" />
                {item.image ? (
                  <>
                    <img
                      src={item.image.src}
                      alt={item.image.alt}
                      className="relative w-full"
                      loading="lazy"
                    />
                    {(item.title || item.body) && (
                      <div className="relative mt-2 p-2">
                        {item.title && (
                          <h3 className="font-display text-base uppercase leading-tight text-brand-green">
                            {item.title}
                          </h3>
                        )}
                        {item.body && (
                          <p className="mt-1 text-sm leading-relaxed text-foreground/85">
                            {item.body}
                          </p>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="relative p-4 sm:p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-red">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    {item.title && (
                      <h3 className="mt-2 font-display text-lg uppercase leading-tight text-brand-green sm:text-xl">
                        {item.title}
                      </h3>
                    )}
                    {item.body && (
                      <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                        {item.body}
                      </p>
                    )}
                  </div>
                )}
              </div>
              {/* figcaption removed — page-number labels no longer shown */}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
