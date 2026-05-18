# The Wellness Brickdown — Lead Magnet Landing Page Template

A poster-style, config-driven landing page template. The current lead magnet ("The Ultra-Processed Food Trap") ships as the first live example. Future lead magnets are updated by editing one config file — no layout work needed.

## 1. Architecture

**Single route, component-driven, config-fed.**

```text
src/
  routes/
    index.tsx                  → renders <LeadMagnetPage config={currentLeadMagnet} />
  content/
    leadMagnets/
      ultraProcessedFoodTrap.ts   ← first lead magnet config (the editable file)
      types.ts                    ← LeadMagnetConfig TypeScript interface
  components/
    leadMagnet/
      LeadMagnetPage.tsx       ← orchestrates all sections from config
      ClassificationBar.tsx
      Navbar.tsx
      Hero.tsx                 ← includes OptInForm
      ProblemSection.tsx
      MechanismSection.tsx     ← dark green band
      DiscoverSection.tsx      ← evidence-panel benefits
      MidCtaBand.tsx
      PreviewSection.tsx       ← 4 lead magnet page previews
      WhyItMattersSection.tsx
      AboutSection.tsx
      FinalCta.tsx             ← dark green poster + OptInForm
      FaqSection.tsx           ← shadcn Accordion
      Footer.tsx
      OptInForm.tsx            ← reusable, placeholder submit
      EvidenceCard.tsx, FieldReportTag.tsx, PosterFrame.tsx (shared bits)
  assets/leadMagnets/ultra-processed/
      cover.png, exposed.png, rebuild.png, whats-next.png
  styles.css                   ← Brickland design tokens
```

`src/routes/index.tsx` is a 3-line file: import config + page, render. Swapping lead magnets = swap the imported config.

## 2. The LeadMagnetConfig contract

The single source of truth a non-developer (or another Lovable prompt) edits:

```ts
type LeadMagnetConfig = {
  leadMagnetId: string;              // "LP001"
  fieldReportLabel: string;          // "Brickland Field Report"
  classificationBarText: string;
  brandName: string;                 // "The Wellness Brickdown"
  countyName: string;                // "Craving County"

  hero: {
    eyebrow: string;
    titleLine1: string;
    titleHighlight: string;          // rendered in warning red
    subtitle: string;
    image: { src: string; alt: string };
    trustLine: string;
    privacyLine: string;
    privacyPolicyText: string;
  };

  problem: { title: string; intro: string[]; cards: Card[] };       // 3 cards
  mechanism: { title: string; intro: string; cards: Card[] };       // 3 cards
  discover: { title: string; intro: string; bullets: string[] };    // 7 bullets

  midCta: { eyebrow: string; headline: string; buttonLabel: string };

  preview: {
    title: string;
    intro: string;
    items: { label: string; image: { src: string; alt: string } }[]; // 4
  };

  whyItMatters: { title: string; intro: string; cards: Card[] };    // 4 cards
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
    nameLabel: string; emailLabel: string;
    consentLabel: string;       // GDPR text
    submitLabel: string;
  };
};

type Card = { label: string; title: string; body: string };
```

The Ultra-Processed Food Trap config is populated verbatim from the brief (British English, careful "can/may/is associated with" language).

## 3. Visual identity

CSS tokens in `src/styles.css` (oklch equivalents of the brief's hex values, used via Tailwind semantic classes — no hex in components):

- `--background` beige #E8D8B8 with subtle paper-grain texture (CSS radial-gradient noise)
- `--panel-cream` #FFF3D6 (warm cream cards)
- `--brand-green` #173F2A (deep green borders, dark sections)
- `--brand-red` #A8322D (warning accents, highlight words)
- `--foreground` #202020 charcoal
- `--brand-brown` #6F5C45 (muted labels, frames)
- `--brick-yellow` #D9A441
- `--terracotta` #B96145

Typography pairing: **Oswald / Bebas Neue** display (poster headlines) + **Lora** serif body + **JetBrains Mono** for evidence/report tags. Loaded via Google Fonts in `__root.tsx`.

Recurring shapes:
- Thin double-line poster frame around every section
- `PosterFrame` component (deep green outer border + cream inner)
- Monospace stencil tag (`FIELD REPORT · LP001 · CRAVING COUNTY`)
- Numbered tabs on cards (rounded green chips with white numerals — echoing the "1/2/3" markers in the source artwork)

No SaaS gradients, no glossy buttons, no purple/blue.

## 4. Section build notes

- **Classification bar**: full-width brown strip, monospace, small caps.
- **Navbar**: brand wordmark left, monospace field-report tag centre, "Get the Guide" anchor right → `#final-cta`.
- **Hero**: 2-col desktop (copy left, cover image right). On `<md`, image is `order-2` so headline + form appear first. Form sits in a cream panel with a red wax-stamp-style "FREE GUIDE" badge.
- **Problem / Why It Matters / Preview**: 3- or 4-up grids of `EvidenceCard`s (cream panels, brown frame, numbered tab, optional small icon).
- **Mechanism**: full-bleed deep-green band with cream cards reversed-out.
- **Discover**: cream "evidence panel" with vertical red rule, bullets prefixed by monospace `›`.
- **Mid CTA band**: compact deep-green strip, single button, scrolls to `#final-cta`.
- **Preview strip**: 4 cards using the four uploaded page images, each with a brown frame and stencil label.
- **Final CTA**: large deep-green poster section, cream form panel inside.
- **FAQ**: shadcn `Accordion`, single-open, cream panels with brown dividers.
- **Footer**: brown band, monospace disclaimers.

## 5. Forms (placeholder, integration-ready)

`OptInForm` is shared by hero + final CTA. Props: `formId`, labels.

- Native `<form onSubmit={(e) => { e.preventDefault(); /* TODO: integrate */ }}>`
- Fields: Name, Email, GDPR consent checkbox (currently optional, code-commented `// required when provider connected`)
- Inputs min-height 44px, large tap targets, focus rings in brand green
- On submit: shows a cream "Check your inbox" success panel (client-only, no network)
- Clear `// LEAD MAGNET INTEGRATION` comment block at top of file listing where to plug MailerLite / ConvertKit / Beehiiv / Mailchimp

## 6. Accessibility, responsiveness, SEO

- Single `<h1>` (hero), `<h2>` per section
- All images `alt`-texted from config
- Smooth scroll via `scroll-behavior: smooth` on `<html>` + `scroll-mt` on anchor targets
- Mobile QA at 375px: no horizontal scroll, CTA above fold, hero form before image
- Route `head()`: title "The Ultra-Processed Food Trap — Free Brickland Field Guide", description from subtitle, og:image = hero cover, og:type website
- JSON-LD `FAQPage` generated from `config.faq`

## 7. Legal/safety

- British English spell-check pass (organise, behaviour, recognise…)
- No real brands; all institutions are Brickland-fictional
- Hedged language preserved verbatim from brief
- "Educational content only · Not medical advice" appears in classification bar, about section, and footer

## 8. Post-build deliverables (returned in chat after implementation)

1. Section-by-section page map
2. Editable fields list (everything in `LeadMagnetConfig`) + how to create a second lead magnet (duplicate the config file, import in `index.tsx`)
3. Assets confirmation — the four uploaded pages are wired; note where to drop replacements for future lead magnets (`src/assets/leadMagnets/<slug>/`)
4. Email integration TODO: provider choice, API key as Lovable Cloud secret, replace `onSubmit` in `OptInForm.tsx`, flip consent checkbox to `required`
5. Pre-publish QA checklist (375px scroll, anchor links, FAQ open/close, form validation, OG preview, British English, disclaimers visible, no real brands)

## Technical details

- Stack: existing TanStack Start + Tailwind v4 + shadcn (Accordion, Checkbox, Input, Label, Button)
- No new heavy deps; Google Fonts via `<link>` in root `head()`
- No backend wiring this pass — form is intentionally inert
- All copy lives in `ultraProcessedFoodTrap.ts`; components contain zero hardcoded marketing strings
