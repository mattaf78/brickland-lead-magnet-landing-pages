/**
 * WB002 — "It's Built This Way" Lead Magnet Landing Page Content
 * ──────────────────────────────────────────────────────────────
 * Single source of truth for all text, headlines, bullets, CTA labels
 * and section visibility on the /thetruth2 page.
 *
 * Set  visible: false  on any section to hide it (no layout gaps).
 * Do NOT remove footer disclaimers without a legal review.
 *
 * BEFORE PUBLISHING:
 *   1. Replace  systemeTagId  with the real WB002 Systeme.io tag, and
 *      decide how src/lib/subscribe.ts should route per-funnel tags.
 *   2. Confirm the hero image (currently reusing WB001 cover until a
 *      WB002 asset is provided).
 *   3. Optionally add an image to each What's Included card via the
 *      preview.items[].image field.
 */

import type { LeadMagnetConfig } from "./types";
import coverImg from "@/assets/leadMagnets/ultra-processed/cover.png";

export const foodSystemBuiltThisWay: LeadMagnetConfig = {
  leadMagnetId: "LP002",
  fieldReportLabel: "", // Empty: hides the field-report tag from the navbar
  classificationBarText:
    "Wellness Brickdown — Educational Content Only — Not Medical Advice",
  brandName: "The Wellness Brickdown",
  countyName: "Craving County",

  seo: {
    pageTitle:
      "The Food System Isn't Broken. It's Built This Way. — The Wellness Brickdown",
    metaDescription:
      "Discover how modern food companies, supermarkets, apps and adverts quietly shape what you crave, buy and blame yourself for. Download the free Wellness Brickdown field guide.",
    ogTitle: "The Food System Isn't Broken. It's Built This Way.",
    ogDescription:
      "Discover how modern food companies, supermarkets, apps and adverts quietly shape what you crave, buy and blame yourself for.",
    canonicalPath: "/thetruth2",
  },

  // Uses the same Systeme.io tag as WB001 (/thetruth).
  systemeTagId: 2018014,
  downloadPageUrl: "",

  navbar: {
    logoMonogram: "WB",
    ctaLabel: "Get the Guide",
  },

  sectionLabels: {
    discover: "Inside What You'll Learn",
    preview: "What's Included",
    faq: { eyebrow: "Frequently Asked", heading: "Questions from the Field" },
  },

  privacyPolicyUrl: "/privacy",

  // ─── Hero ───────────────────────────────────────────────────────────────
  hero: {
    visible: true,
    eyebrow: "Free Guide — Brickland Field Report",
    titleLine1: "The Food System Isn't Broken.",
    titleHighlight: "It's Built This Way.",
    subtitle:
      "Discover how modern food companies, supermarkets, apps and adverts quietly shape what you crave, buy and blame yourself for. Download the free Wellness Brickdown field guide: Exposed — What the Modern Food System Was Built To Do.",
    image: {
      src: coverImg,
      alt: "Exposed — What the Modern Food System Was Built To Do (cover)",
    },
    trustLine: "A Wellness Brickdown field report from inside Craving County.",
    privacyLine: "No spam. Unsubscribe anytime.",
    privacyPolicyText:
      "See our Privacy Policy for details on how we handle your data.",
  },

  // ─── Hidden on this page ────────────────────────────────────────────────
  problem: { visible: false, title: "", intro: [], cards: [] },
  mechanism: { visible: false, title: "", intro: "", cards: [] },

  // ─── Inside What You'll Learn ───────────────────────────────────────────
  // title is empty so the sectionLabel (with red dot) acts as the sole heading
  discover: {
    visible: true,
    title: "",
    intro:
      "A clear, visual breakdown of the hidden systems behind ultra-processed food, cravings, confusion and repeat consumption.",
    bullets: [
      "Why cravings are not just a willpower problem.",
      "How supermarkets turn intention into impulse.",
      "Why “healthy-looking” foods are often junk in disguise.",
      "How food apps, adverts and feeds keep pushing you to consume.",
      "How children and families are targeted before they can defend themselves.",
      "Five simple ways to fight back without becoming obsessive.",
    ],
  },

  midCta: { visible: false, eyebrow: "", headline: "", buttonLabel: "" },

  // ─── What's Included (six text-only cards) ──────────────────────────────
  // title is empty so the sectionLabel (with red dot) acts as the sole heading
  preview: {
    visible: true,
    title: "",
    intro:
      "Six short sections that map the system behind everyday food choices — and one practical rebuild.",
    items: [
      {
        label: "01",
        title: "The Ingredient Playbook",
        body: "How food is made sweeter, softer, saltier, crunchier and easier to keep eating.",
      },
      {
        label: "02",
        title: "The Supermarket Trap",
        body: "How shelf placement, offers and checkout cues turn shopping into a behavioural maze.",
      },
      {
        label: "03",
        title: "The Digital Trap",
        body: "How food apps, ads and feeds follow you long after you leave the shop.",
      },
      {
        label: "04",
        title: "The Family Trap",
        body: "How children and parents get pulled in through mascots, colours, pester power and “healthy” claims.",
      },
      {
        label: "05",
        title: "The Influence Game",
        body: "How lobbying, research funding and public messaging shape what people hear about food.",
      },
      {
        label: "06",
        title: "The Rebuild Section",
        body: "Five practical ways to make better choices easier at home, in shops and with your family.",
      },
    ],
  },

  whyItMatters: { visible: false, title: "", intro: "", cards: [] },
  about: { visible: false, title: "", paragraphs: [] },

  // ─── This Is Not a Diet Guide (callout) — hidden per editorial decision ──
  callout: {
    visible: false,
    eyebrow: "This Is Not a Diet Guide",
    heading: "No Rules. No Guilt. No Calorie Maths.",
    lines: [
      "No calorie counting.",
      "No guilt trip.",
      "No boring food rules.",
    ],
    closingLine:
      "Just a clear, visual breakdown of the hidden systems behind ultra-processed food, cravings, confusion and repeat consumption. Once you see the system, you stop blaming yourself for it.",
  },

  // ─── Final CTA ──────────────────────────────────────────────────────────
  finalCta: {
    visible: true,
    eyebrow: "Get the Free Guide",
    titleLine1: "See the System.",
    titleHighlight: "Break the Cycle.",
    body:
      "Enter your email below and we'll send the free guide straight to you.",
    buttonLabel: "Download the Free Guide",
  },

  // ─── FAQ hidden on this page (enable later by setting visible: true) ────
  faq: { visible: false, items: [] },

  // ─── Footer (do NOT remove disclaimers without legal review) ────────────
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