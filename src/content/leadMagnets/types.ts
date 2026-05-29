export type Card = { label: string; title: string; body: string };

export type FaqItem = { question: string; answer: string };

export type LeadMagnetConfig = {
  leadMagnetId: string;
  fieldReportLabel: string;
  classificationBarText: string;
  brandName: string;
  countyName: string;

  // ─── SEO & page settings ────────────────────────────────────────────────────
  seo?: {
    pageTitle?: string;
    metaDescription?: string;
    ogTitle?: string;
    ogDescription?: string;
    canonicalPath?: string;
  };

  // ─── Integrations ────────────────────────────────────────────────────────────
  /** Systeme.io tag ID assigned to contacts who opt in via this lead magnet.
   *  Change this here when creating a new funnel — the live value lives in
   *  src/lib/subscribe.ts and must be updated there too. */
  systemeTagId?: number;

  /** URL of the download / thank-you page shown after successful opt-in.
   *  Currently handled by Systeme.io automation. Update when the page moves. */
  downloadPageUrl?: string;

  navbar?: {
    logoMonogram?: string;
    ctaLabel?: string;
  };

  sectionLabels?: {
    problem?: string;
    mechanism?: string;
    discover?: string;
    whyItMatters?: string;
    about?: string;
    preview?: string;
    faq?: { eyebrow?: string; heading?: string };
  };

  privacyPolicyUrl?: string;

  hero: {
    visible?: boolean;
    eyebrow: string;
    titleLine1: string;
    titleHighlight: string;
    subtitle: string;
    image: { src: string; alt: string };
    trustLine: string;
    privacyLine: string;
    privacyPolicyText: string;
  };

  problem: { visible?: boolean; title: string; intro: string[]; cards: Card[] };
  mechanism: { visible?: boolean; title: string; intro: string; cards: Card[] };
  discover: { visible?: boolean; title: string; intro: string; bullets: string[] };

  midCta: { visible?: boolean; eyebrow: string; headline: string; buttonLabel: string };

  preview: {
    visible?: boolean;
    title: string;
    intro: string;
    items: {
      label: string;
      title?: string;
      body?: string;
      image?: { src: string; alt: string };
    }[];
  };

  whyItMatters: { visible?: boolean; title: string; intro: string; cards: Card[] };
  about: { visible?: boolean; title: string; paragraphs: string[] };

  /** Reusable callout block — short, emphatic stacked lines + closing line.
   *  Used for "This is not a diet guide" style framing sections. */
  callout?: {
    visible?: boolean;
    eyebrow?: string;
    heading: string;
    lines: string[];
    closingLine?: string;
  };

  finalCta: {
    visible?: boolean;
    eyebrow: string;
    titleLine1: string;
    titleHighlight: string;
    body: string;
    buttonLabel: string;
  };

  faq: {
    visible?: boolean;
    items: FaqItem[];
  };

  footer: {
    visible?: boolean;
    brandName: string;
    fictionDisclaimer: string;
    noBrandsLine: string;
    medicalDisclaimer: string;
  };

  form: {
    nameLabel: string;
    emailLabel: string;
    consentLabel: string;
    submitLabel: string;
    successEyebrow?: string;
    successHeading?: string;
    successBody?: string;
  };
};
