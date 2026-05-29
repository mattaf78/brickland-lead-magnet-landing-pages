/**
 * WB001 — "They Knew" Lead Magnet Landing Page Content
 * ─────────────────────────────────────────────────────
 * This is the single place to edit all page text, headlines, bullets,
 * FAQ items, CTA labels and section visibility.
 *
 * HOW TO HIDE A SECTION
 *   Set  visible: false  on any section below.
 *   The section will not render and will leave no gap in the layout.
 *
 * HOW TO CHANGE CTA TEXT
 *   Edit  midCta.buttonLabel  or  finalCta.buttonLabel  below.
 *   The form submit button label is in  form.submitLabel.
 *
 * HOW TO UPDATE THE SYSTEME.IO INTEGRATION
 *   The tag ID reference is  systemeTagId  below (for documentation).
 *   The live value that fires on form submit is in  src/lib/subscribe.ts
 *   at  SYSTEME_TAG_ID — update both together.
 *
 * HOW TO UPDATE THE DOWNLOAD / THANK-YOU PAGE LINK
 *   Set  downloadPageUrl  below and update your Systeme.io automation
 *   to point to the same URL.
 *
 * DO NOT REMOVE the medicalDisclaimer or fictionDisclaimer from the
 * footer without a legal review first.
 *
 * Keep all CTA links and Systeme.io settings confirmed before publishing.
 */

import type { LeadMagnetConfig } from "./types";
import coverImg from "@/assets/leadMagnets/ultra-processed/cover.png";
import exposedImg from "@/assets/leadMagnets/ultra-processed/exposed.png";
import rebuildImg from "@/assets/leadMagnets/ultra-processed/rebuild.png";
import whatsNextImg from "@/assets/leadMagnets/ultra-processed/whats-next.png";

export const ultraProcessedFoodTrap: LeadMagnetConfig = {
  leadMagnetId: "LP001",
  fieldReportLabel: "Brickland Field Report",
  classificationBarText:
    "Wellness Brickdown — Field Report LP001 — Educational Content Only — Not Medical Advice",
  brandName: "The Wellness Brickdown",
  countyName: "Craving County",

  // ─── SEO & page settings ──────────────────────────────────────────────────
  seo: {
    pageTitle: "The Ultra-Processed Food Trap — Free Brickland Field Guide",
    metaDescription:
      "Download the free Brickland field guide showing how cravings, labels, offers, texture, convenience and repeat-purchase cues can shape eating behaviour — and how to make willpower work less hard.",
    ogTitle: "The Food System Isn't Broken. It's Built This Way.",
    ogDescription:
      "Download the free Brickland field guide showing how cravings, labels, offers, texture, convenience and repeat-purchase cues can shape eating behaviour — and how to make willpower work less hard.",
    canonicalPath: "/thetruth",
  },

  // ─── Integrations ─────────────────────────────────────────────────────────
  // Systeme.io tag assigned on opt-in. Live value also in src/lib/subscribe.ts.
  systemeTagId: 2018014,
  // Update this when the download / thank-you page URL changes.
  downloadPageUrl: "", // e.g. "https://systeme.io/download/wb001"

  // ─── Navigation ───────────────────────────────────────────────────────────
  navbar: {
    logoMonogram: "WB",
    ctaLabel: "Get the Guide",
  },

  sectionLabels: {
    problem: "Case File 01",
    mechanism: "Hidden Mechanism",
    discover: "Evidence Panel",
    whyItMatters: "Field Observations",
    about: "About the Investigators",
    preview: "Inside the Report",
    faq: { eyebrow: "Frequently Asked", heading: "Questions from the Field" },
  },

  privacyPolicyUrl: "/privacy",

  // ─── Hero ─────────────────────────────────────────────────────────────────
  hero: {
    visible: true,
    eyebrow: "Free Guide — Brickland Field Report",
    titleLine1: "The Food System Isn't Broken.",
    titleHighlight: "It's Built This Way.",
    subtitle:
      "Download the free Brickland field guide showing how cravings, labels, offers, texture, convenience and repeat-purchase cues can shape eating behaviour — and how to make willpower work less hard.",
    image: { src: coverImg, alt: "The Wellness Brickdown — Exposed cover" },
    trustLine: "A Wellness Brickdown field report from inside Craving County.",
    privacyLine: "No spam. Free guide. Unsubscribe anytime.",
    privacyPolicyText:
      "See our Privacy Policy for details on how we handle your data.",
  },

  // ─── Problem / Willpower section ──────────────────────────────────────────
  problem: {
    visible: true,
    title: "It Was Never Just Willpower",
    intro: [
      "You have heard the line: “Just choose better.” Nice little phrase. Very tidy. Very convenient. But food choices do not happen in a blank room.",
      "They happen in environments built around convenience, sensory reward, discount pressure and repeat-purchase cues. The environment shapes the choice before willpower gets anywhere near it.",
    ],
    cards: [
      {
        label: "Exhibit A",
        title: "Shelf Design",
        body: "Eye-line placement, end-of-aisle prominence and bright packaging can steer a basket before the shopper notices.",
      },
      {
        label: "Exhibit B",
        title: "Discount Pressure",
        body: "Multi-buys, meal deals and loyalty offers can make the cheapest calories the most visible ones.",
      },
      {
        label: "Exhibit C",
        title: "Convenience Loops",
        body: "Single-hand snacks, resealable packs and ready-to-eat formats can reduce friction between craving and consumption.",
      },
    ],
  },

  // ─── Hidden Mechanism section ─────────────────────────────────────────────
  mechanism: {
    visible: true,
    title: "How the Easy Choice Gets Easier",
    intro:
      "Inside Brickland’s Craving County, the Snackworks Factory does not force anyone to choose poorly. It just makes the easy choice easier — again and again, until the easier choice becomes the only one people reach for.",
    cards: [
      {
        label: "01",
        title: "Design",
        body: "Texture, mouthfeel, salt, sugar and fat ratios are tuned to keep eating feeling effortless.",
      },
      {
        label: "02",
        title: "Promote",
        body: "Health-flavoured language, cartoon mascots and on-pack claims can frame products as smarter choices than they are.",
      },
      {
        label: "03",
        title: "Repeat",
        body: "Pricing, placement and packet size encourage another purchase, another portion and another snack window.",
      },
    ],
  },

  // ─── What You Will Discover section ──────────────────────────────────────
  discover: {
    visible: true,
    title: "What You Will Discover",
    intro:
      "This is not a diet plan. It is a field report — a clear map of the system behind cravings, food choices and self-blame.",
    bullets: [
      "Why willpower is not fighting in a neutral environment — and why that changes everything.",
      "How shelf design, packaging and discount cues can nudge behaviour before conscious thought kicks in.",
      "How labels and health claims can shape perception in ways that may not match the evidence.",
      "Why deals, placement and convenience can quietly dominate food choices throughout the day.",
      "What the research supports, and what it does not prove — stated clearly and fairly.",
      "How to rebuild your setup so that better choices require less force and less self-blame.",
      "How to spot the system around you without turning it into a source of guilt.",
    ],
  },

  // ─── Mid-page CTA band ────────────────────────────────────────────────────
  midCta: {
    visible: true,
    eyebrow: "Ready to map the system?",
    headline: "Download the Free Brickland Field Guide",
    buttonLabel: "Download the Free Guide",
  },

  // ─── Lead Magnet Preview section ─────────────────────────────────────────
  preview: {
    visible: true,
    title: "A Brickland Field Report. Not a Standard Diet PDF.",
    intro:
      "The Brickland field guide uses a satirical, miniature brick-built world to make food-system research accessible. Serious evidence. Investigative tone. No lecture. No guilt.",
    items: [
      { label: "Cover", image: { src: coverImg, alt: "Field report cover" } },
      { label: "Evidence", image: { src: exposedImg, alt: "Evidence page" } },
      { label: "Rebuild", image: { src: rebuildImg, alt: "Rebuild page" } },
      { label: "What’s Next", image: { src: whatsNextImg, alt: "What happens next page" } },
    ],
  },

  // ─── Why It Matters section ───────────────────────────────────────────────
  whyItMatters: {
    visible: true,
    title: "Why This Is Worth Understanding",
    intro:
      "The consequences of an engineered food environment are everyday ones: impulse purchases, repeated snacking patterns, energy fluctuations and persistent self-blame. These are not character flaws. They are predictable outcomes of a designed system.",
    cards: [
      {
        label: "Pattern 01",
        title: "Craving patterns",
        body: "Repeated cues can train the body to expect sweet, salty or crunchy resets at the same times each day.",
      },
      {
        label: "Pattern 02",
        title: "Everyday food choices",
        body: "Small environmental nudges add up across a week into the bulk of what ends up on the plate.",
      },
      {
        label: "Pattern 03",
        title: "The self-blame loop",
        body: "Designed-for-repeat eating gets misread as personal failure, which can fuel another cycle of the same behaviour.",
      },
      {
        label: "Pattern 04",
        title: "Environmental design",
        body: "Homes, workplaces and high streets are shaped by the same incentives as the products on the shelf.",
      },
    ],
  },

  // ─── About section ────────────────────────────────────────────────────────
  about: {
    visible: true,
    title: "The Wellness Brickdown",
    paragraphs: [
      "The Wellness Brickdown investigates the machinery behind everyday health problems — using a satirical, miniature brick-built world called Brickland.",
      "Inside Brickland, the fictional Department of Convenient Confusion, the Snackworks Factory and the Shelf-Light Council stand in for the real systems shaping modern food environments. The satire is there to make the system visible. The project draws on published evidence.",
      "This is educational commentary. It is not medical advice and not a health service. It is a field report from inside Craving County — written for people who want to understand what they are up against.",
    ],
  },

  // ─── Final CTA section ────────────────────────────────────────────────────
  finalCta: {
    visible: true,
    eyebrow: "Get the Free Guide",
    titleLine1: "The Map Was Always There.",
    titleHighlight: "Most People Never Saw It.",
    body: "Download the free Brickland field guide. Understand the system. Stop blaming yourself for its effects.",
    buttonLabel: "Download the Free Guide",
  },

  // ─── FAQ section ──────────────────────────────────────────────────────────
  faq: {
    visible: true,
    items: [
      {
        question: "Is the guide free?",
        answer:
          "Yes. Enter your name and email address and the guide will be sent to you.",
      },
      {
        question: "Who is this for?",
        answer:
          "It is for people who want to understand how the modern food environment shapes cravings, energy and everyday choices — especially if they are tired of blaming themselves for willpower failures.",
      },
      {
        question: "Is this medical advice?",
        answer:
          "No. This is educational content and commentary. It does not diagnose, treat or replace advice from a qualified health professional. If you have health concerns, speak to your GP or a qualified practitioner.",
      },
      {
        question: "How long does it take to read?",
        answer:
          "Most people can read it in around 10 to 15 minutes, depending on how carefully they go through the examples.",
      },
      {
        question: "Will this tell me exactly what to eat?",
        answer:
          "No. It is not a diet plan. It helps you understand the system influencing your choices so you can make clearer decisions with less self-blame. For specific dietary advice, speak to a registered dietitian or qualified health professional.",
      },
    ],
  },

  // ─── Footer ───────────────────────────────────────────────────────────────
  // DO NOT remove the disclaimers below without a legal review.
  footer: {
    visible: true,
    brandName: "The Wellness Brickdown",
    fictionDisclaimer:
      "Brickland is a fictional satirical world created for educational commentary. All characters, institutions and locations within Brickland are fictional.",
    noBrandsLine:
      "No real-world brands, companies or products are named, targeted or depicted in this content.",
    medicalDisclaimer:
      "Educational content only. Not medical advice. This material is provided for education and general commentary only. It is not a substitute for professional medical, nutritional or psychological advice, diagnosis or treatment. Always speak to a qualified health professional before making significant changes to your diet, lifestyle or health routines.",
  },

  // ─── Opt-in form labels ───────────────────────────────────────────────────
  form: {
    nameLabel: "Your name",
    emailLabel: "Your email address",
    consentLabel:
      "I agree to receive the free guide and occasional emails from Vital Living Ltd / The Wellness Brickdown, including educational content, free resources, updates, and promotional emails about courses, programmes, apps, services and related offers. I understand I can unsubscribe at any time.",
    submitLabel: "Download the Free Guide",
    successEyebrow: "Field report dispatched",
    successHeading: "Check your inbox.",
    successBody:
      "Your free Brickland field guide is on its way. If it doesn't arrive within a few minutes, check spam or promotions.",
  },
};
