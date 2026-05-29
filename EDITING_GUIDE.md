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

## Adding a new lead magnet page

The page at `/thetruth` (WB001) and `/thetruth2` (WB002) both share the same
components. To add a third lead magnet:

1. **Copy a content file:** duplicate `src/content/leadMagnets/foodSystemBuiltThisWay.ts`
   and rename it (e.g. `myNewGuide.ts`). Update every field.
2. **Flip section visibility:** set `visible: true` on the sections you want
   and `visible: false` on the ones you don't. Required-but-hidden sections
   can keep empty strings/arrays — they won't render.
3. **Add a route:** copy `src/routes/thetruth2.tsx` to e.g.
   `src/routes/mynewguide.tsx` and update the import + `createFileRoute` path.
4. **Assign a unique `systemeTagId`** in the new content file, and update
   `src/lib/subscribe.ts` to route opt-ins from this funnel to that tag.

### The `callout` block (optional)

Use a callout for short, emphatic "this is not X" framing:

```ts
callout: {
  visible: true,
  eyebrow: "This Is Not a Diet Guide",
  heading: "No Rules. No Guilt. No Calorie Maths.",
  lines: ["No calorie counting.", "No guilt trip.", "No boring food rules."],
  closingLine: "Once you see the system, you stop blaming yourself for it.",
}
```

Omit the whole `callout` field on pages that don't need it.

### `preview` items — image optional

Each item in `preview.items` can be a text card (label + title + body), an
image card (label + image), or both. Use whichever fits the page:

```ts
preview: {
  items: [
    // text-only
    { label: "01", title: "The Ingredient Playbook", body: "How food is…" },
    // image-only (original WB001 shape)
    { label: "Cover", image: { src: coverImg, alt: "Cover" } },
    // both
    { label: "02", title: "Supermarket Trap", body: "Shelf cues…",
      image: { src: shelfImg, alt: "Shelf" } },
  ],
}
```

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
