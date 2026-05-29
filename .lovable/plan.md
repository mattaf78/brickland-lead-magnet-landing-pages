## Goal

Make the existing template flexible enough to render the new outline ("The Food System Isn't Broken. It's Built This Way."), then ship it at `/thetruth2`. Reuse all existing components and styling — no redesign.

## Mapping the outline → template sections

| Outline block | Template section |
|---|---|
| Headline + subhead + hero opt-in | `hero` |
| "Inside, You'll Learn" (6 bullets) | `discover` |
| "What's Included" (6 cards: Ingredient Playbook, Supermarket Trap, Digital Trap, Family Trap, Influence Game, Rebuild) | `preview` (extended — see below) |
| "This Is Not a Diet Guide" (3 No-lines + closing line) | New `callout` section |
| "Get the Free Guide" closing block | `finalCta` |
| Footer / disclaimers | `footer` (unchanged) |

Other existing sections (`problem`, `mechanism`, `whyItMatters`, `about`, `midCta`, `faq`) are not in the outline. They will be set to `visible: false` on this page only — the WB001/`/thetruth` page is unaffected.

## Template changes (apply once, benefit every future page)

1. **Extend `preview` items to support text + optional image.**
   In `src/content/leadMagnets/types.ts`, change `preview.items[]` from `{ label; image }` to:
   ```
   { label: string; title?: string; body?: string; image?: { src; alt } }
   ```
   Update `PreviewSection.tsx` so each card renders:
   - label (always)
   - title (if present)
   - body (if present)
   - image (if present) — falls back gracefully to a text-only card
   Existing WB001 config keeps working because `label` + `image` still validate.

2. **Add a reusable `callout` section.**
   New optional block on `LeadMagnetConfig`:
   ```
   callout?: {
     visible?: boolean;
     eyebrow?: string;
     heading: string;
     lines: string[];     // rendered as stacked emphatic lines
     closingLine?: string;
   }
   ```
   New `CalloutSection.tsx` component in the Brickland style (cream panel, brand-green border, red accent on the closing line). Mount it in `LeadMagnetPage.tsx` between `preview` and `whyItMatters`, gated by `show(config.callout?.visible)`. Absent on WB001 → not rendered.

3. **No other component changes.** Hero, OptInForm, FinalCta, FAQ, Footer, Navbar all reused as-is.

## New page

4. **Content file:** `src/content/leadMagnets/foodSystemBuiltThisWay.ts`
   - `leadMagnetId: "WB002"`, `fieldReportLabel: "Field Report 002"`
   - SEO: title "The Food System Isn't Broken. It's Built This Way. — The Wellness Brickdown", canonical `/thetruth2`
   - `hero` → outline headline ("The Food System Isn't Broken." / highlight "It's Built This Way."), subtitle, reuse current hero image (placeholder) until a new one is provided
   - `discover` → the six "Inside, You'll Learn" bullets verbatim (British English preserved)
   - `preview` → six cards with label + title + body from the outline; `image` left undefined for now (per your answer — text-only, images optional later)
   - `callout` → "This Is Not a Diet Guide" with the three No-lines + closing "Once you see the system, you stop blaming yourself for it."
   - `finalCta` → "See the system. Break the cycle." + "Download the Free Guide"
   - `faq` set to `visible: false` (no FAQ in the outline; can be enabled later)
   - `problem`, `mechanism`, `midCta`, `whyItMatters`, `about` → `visible: false`
   - `footer` → identical disclaimers to WB001
   - `form` → same labels as WB001, `submitLabel: "Download the Free Guide"`
   - `systemeTagId` → **left as a TODO placeholder you confirm before publish** (separate Systeme.io tag from WB001 so opt-ins are trackable per funnel)

5. **Route:** `src/routes/thetruth2.tsx`
   Mirror `src/routes/thetruth.tsx` exactly, importing the new config. Same `head()` shape (title, description, og:*, canonical, FAQPage JSON-LD only if `faq.visible`).

## Editing guide update

6. Append a short "Adding a new lead magnet page" section to `EDITING_GUIDE.md` explaining: (a) duplicate the content file, (b) flip `visible` flags for the sections you want, (c) add a route file, (d) assign a new `systemeTagId`. Document the new `callout` block and the extended `preview` item shape.

## Things I will NOT do

- Will not change `/thetruth` (WB001) or its content file.
- Will not redesign any component or change the brand palette/typography.
- Will not wire a new Systeme.io tag — `systemeTagId` will be a clearly-marked TODO so you can set it and update `SYSTEME_TAG_ID` in `src/lib/subscribe.ts` before publishing. (Note: `subscribe.ts` currently uses a single hard-coded tag — flag below.)
- Will not generate new hero/preview imagery. The hero will reuse the existing image until you provide replacements; the six "What's Included" cards will be text-only.
- Will not publish.

## Manual checks / risks before publishing

- **Per-page Systeme.io tag:** `src/lib/subscribe.ts` currently sends every opt-in to one tag ID. If you want WB001 and WB002 leads tagged differently, that file needs a small change to read `leadMagnetId` from the form payload and map it to a tag ID. Happy to do this in the same build if you confirm — otherwise both pages will tag identically.
- Confirm British English throughout the new copy after I generate it.
- Confirm `/thetruth` still renders unchanged after the type extension.
- Confirm mobile stacking on the new page (393px) — hero → form → "Inside, You'll Learn" → "What's Included" cards stacked single-column → callout → final CTA.

## Files that will be created or changed

- `src/content/leadMagnets/types.ts` — extend `preview.items` shape, add optional `callout` block
- `src/components/leadMagnet/PreviewSection.tsx` — render optional title/body, handle missing image
- `src/components/leadMagnet/CalloutSection.tsx` — new component
- `src/components/leadMagnet/LeadMagnetPage.tsx` — mount `CalloutSection`
- `src/content/leadMagnets/foodSystemBuiltThisWay.ts` — new (WB002 content)
- `src/routes/thetruth2.tsx` — new route
- `EDITING_GUIDE.md` — short addendum

Approve and I'll switch to build mode and ship it.