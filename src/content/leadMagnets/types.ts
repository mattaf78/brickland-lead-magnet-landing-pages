export type Card = { label: string; title: string; body: string };

export type LeadMagnetConfig = {
  leadMagnetId: string;
  fieldReportLabel: string;
  classificationBarText: string;
  brandName: string;
  countyName: string;

  hero: {
    eyebrow: string;
    titleLine1: string;
    titleHighlight: string;
    subtitle: string;
    image: { src: string; alt: string };
    trustLine: string;
    privacyLine: string;
    privacyPolicyText: string;
  };

  problem: { title: string; intro: string[]; cards: Card[] };
  mechanism: { title: string; intro: string; cards: Card[] };
  discover: { title: string; intro: string; bullets: string[] };

  midCta: { eyebrow: string; headline: string; buttonLabel: string };

  preview: {
    title: string;
    intro: string;
    items: { label: string; image: { src: string; alt: string } }[];
  };

  whyItMatters: { title: string; intro: string; cards: Card[] };
  about: { title: string; paragraphs: string[] };

  finalCta: {
    eyebrow: string;
    titleLine1: string;
    titleHighlight: string;
    body: string;
    buttonLabel: string;
  };

  faq: { question: string; answer: string }[];

  footer: {
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
  };
};
