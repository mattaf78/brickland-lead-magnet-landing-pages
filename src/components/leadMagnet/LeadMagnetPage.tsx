import type { LeadMagnetConfig } from "@/content/leadMagnets/types";
import { ClassificationBar } from "./ClassificationBar";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { ProblemSection } from "./ProblemSection";
import { MechanismSection } from "./MechanismSection";
import { DiscoverSection } from "./DiscoverSection";
import { MidCtaBand } from "./MidCtaBand";
import { PreviewSection } from "./PreviewSection";
import { WhyItMattersSection } from "./WhyItMattersSection";
import { AboutSection } from "./AboutSection";
import { FinalCta } from "./FinalCta";
import { FaqSection } from "./FaqSection";
import { Footer } from "./Footer";

export function LeadMagnetPage({ config }: { config: LeadMagnetConfig }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ClassificationBar text={config.classificationBarText} />
      <Navbar
        brandName={config.brandName}
        fieldReportLabel={config.fieldReportLabel}
        leadMagnetId={config.leadMagnetId}
        logoMonogram={config.navbar?.logoMonogram}
        ctaLabel={config.navbar?.ctaLabel}
      />
      <main>
        <Hero config={config} />
        <ProblemSection config={config} />
        <MechanismSection config={config} />
        <DiscoverSection config={config} />
        <MidCtaBand config={config} />
        <PreviewSection config={config} />
        <WhyItMattersSection config={config} />
        <AboutSection config={config} />
        <FinalCta config={config} />
        <FaqSection config={config} />
      </main>
      <Footer config={config} />
    </div>
  );
}
