# WB001 Landing Page — Editing Guide

All page text, section visibility, CTA labels and links are controlled from
**one file**:

```
src/content/leadMagnets/ultraProcessedFoodTrap.ts
```

Open that file to make any of the changes below.

---

## 1. Edit page text

Find the section you want to change (e.g. `hero`, `problem`, `finalCta`)
and edit the string values directly.

**Example — change the hero headline:**
```ts
hero: {
  titleLine1: "The Food System Isn't Broken.",   // ← edit this
  titleHighlight: "It's Built This Way.",         // ← or this (renders in red)
```

**Example — add or remove a bullet point in the Discover section:**
```ts
discover: {
  bullets: [
    "Why willpower is not fighting in a neutral environment.",
    "Add a new bullet here.",      // ← add
    // "Remove a bullet like this.", // ← comment out to hide
  ],
```

---

## 2. Hide or show a section

Every section has a `visible` field. Set it to `false` to hide the section
completely. The layout adjusts automatically — no blank gaps.

```ts
mechanism: {
  visible: false,   // ← section will not appear on the page
  title: "How the Easy Choice Gets Easier",
  ...
}
```

Set it back to `true` (or remove the line) to restore it.

**Sections you can hide:**
- `hero`
- `problem`
- `mechanism`
- `discover`
- `midCta`
- `preview`
- `whyItMatters`
- `about`
- `finalCta`
- `faq`
- `footer`

> **Do not hide the footer** without legal review — it contains required disclaimers.

---

## 3. Change CTA button text

| Button | Field to edit |
|---|---|
| Mid-page band button | `midCta.buttonLabel` |
| Final CTA section button | `finalCta.buttonLabel` |
| Opt-in form submit button | `form.submitLabel` |
| Navbar button | `navbar.ctaLabel` |

---

## 4. Update the Systeme.io form / opt-in integration

The form submits to Systeme.io via a server function.

**To change the tag assigned on opt-in:**
1. Update `systemeTagId` in `ultraProcessedFoodTrap.ts` (for reference)
2. Update `SYSTEME_TAG_ID` in `src/lib/subscribe.ts` (the live value)

Both must match.

The Systeme.io API key is stored as `SYSTEME_API_KEY` in your Cloudflare
environment secrets — not in this file.

---

## 5. Update the download / thank-you page link

The thank-you page is currently triggered by Systeme.io automation after
opt-in. If you add a standalone download URL:

1. Set `downloadPageUrl` in `ultraProcessedFoodTrap.ts`
2. Update the Systeme.io funnel redirect to match

---

## 6. Update SEO titles and descriptions

Edit the `seo` block near the top of the content file:

```ts
seo: {
  pageTitle: "...",        // browser tab title
  metaDescription: "...", // Google snippet
  ogTitle: "...",         // social share title
  ogDescription: "...",   // social share description
  canonicalPath: "/thetruth",
},
```

---

## 7. What NOT to change before publishing

- Do not remove `footer.medicalDisclaimer` or `footer.fictionDisclaimer`
  without a legal review.
- Do not remove or change `form.consentLabel` without a legal/GDPR review.
- Confirm `systemeTagId` and `SYSTEME_API_KEY` are correct in production
  before going live.
- Confirm `downloadPageUrl` (if set) points to the correct page.
- Test the opt-in form end-to-end after any integration change.
