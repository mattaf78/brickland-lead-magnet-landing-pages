## Goal

Add a password-protected `/admin` editor where you can edit text, toggle/reorder/duplicate sections, and create new landing pages — without touching code. Existing `/thetruth` and `/thetruth2` keep working with identical output.

## What you'll be able to do from /admin

- See a list of all landing pages (`/thetruth`, `/thetruth2`, plus any you create).
- Create a new page at any URL slug.
- For each page: edit every text field, toggle section visibility, reorder sections by drag, duplicate a section, delete a section, add a new section (picking from the existing section types).
- Update the Systeme.io tag per page.
- "Preview" button opens the live page in a new tab.
- Auto-save on blur with a clear saved/unsaved indicator.

## What requires code (out of scope for the editor)

- Adding a brand-new section *type* (e.g. a video embed, a testimonial carousel) — still a small code change to add the component + field schema, then it appears in the admin's "Add section" picker.
- Changing the visual design of a section.
- Swapping images (handled via a simple "paste image URL" field; full image upload UI can be added later).

## Architecture

**Lovable Cloud (Supabase)** for storage + auth. Just you = single email/password login (no Google to keep it simple; tell me if you'd prefer Google).

```text
lead_magnet_pages
  id (uuid)             — primary key
  slug (text, unique)   — e.g. "thetruth", "thetruth2"
  title (text)          — admin display name
  config (jsonb)        — the whole LeadMagnetConfig + ordered sections array
  systeme_tag_id (int)
  published (boolean)   — if false, route 404s
  updated_at (timestamptz)

profiles                — minimal, just to gate admin access
  id (uuid, FK auth.users)
  is_admin (boolean)
```

RLS:
- `lead_magnet_pages` SELECT allowed to `anon` only when `published = true` (so the public site can read).
- INSERT/UPDATE/DELETE only when `has_role(auth.uid(), 'admin')`.
- `user_roles` table follows the standard pattern (separate table, security-definer function) — no roles on profiles.

## Migration of existing content

One-time seed migration that inserts the two existing configs (`ultraProcessedFoodTrap.ts`, `foodSystemBuiltThisWay.ts`) into `lead_magnet_pages` as rows. After that, the `.ts` files are deleted and the routes read from the DB.

## Routing changes

- `src/routes/thetruth.tsx` and `src/routes/thetruth2.tsx` are replaced by a single dynamic catch-all `src/routes/$pageSlug.tsx` that:
  - calls a server function to fetch the page by slug
  - renders `<LeadMagnetPage config={...} />`
  - 404s if not found or not published
- `index.tsx` (homepage) is untouched.
- `/privacy`, `/yourvoice` untouched.

## Sections become an ordered, typed list

Today `LeadMagnetConfig` has fixed-name sections (`hero`, `problem`, `mechanism`, etc.). To support reordering, duplication, and multiple instances of the same type, the schema becomes:

```ts
config.sections: Array<
  | { id, type: "hero",      visible, data: {...} }
  | { id, type: "preview",   visible, data: {...} }
  | { id, type: "callout",   visible, data: {...} }
  | { id, type: "discover",  visible, data: {...} }
  | { id, type: "finalCta",  visible, data: {...} }
  | { id, type: "faq",       visible, data: {...} }
  | ... etc
>
```

`LeadMagnetPage.tsx` is refactored to iterate `config.sections` and dispatch to the matching component, instead of hardcoded named slots. This is the biggest code change. Existing visual output is preserved exactly — same components, same styles, same order on `/thetruth` and `/thetruth2`.

Shared/global fields (brand name, footer disclaimers, SEO, form labels) stay as named top-level fields on the config — they aren't sections.

## Admin UI

- `/admin/login` — email + password.
- `/admin` — list of pages with "New page" button.
- `/admin/$pageSlug` — page editor:
  - Left: vertical list of sections (drag-to-reorder, eye icon to toggle visible, ⋯ menu for duplicate/delete).
  - Right: form for the selected section, fields generated from the section type's schema (text input for strings, textarea for long text, repeater for arrays like bullets/cards/items).
  - Top: page-level settings (slug, title, SEO, systeme tag, published toggle).
  - "View live page" button.
- Uses shadcn forms + react-hook-form + zod for validation, dnd-kit for drag, tanstack-query for data.

## Server functions

- `listPages` (admin only) — `requireSupabaseAuth` + admin role
- `getPageBySlug(slug)` (public) — only returns `published=true` rows, used by the public route
- `getPageForEditor(slug)` (admin only) — returns any row
- `createPage`, `updatePage`, `deletePage` (admin only)

All Supabase writes go through server functions, not the browser client.

## Migration & risks

- The `.ts` content files are only deleted **after** I verify the live `/thetruth` and `/thetruth2` render byte-identically from the DB. I'll diff the rendered HTML.
- The shape change (`sections[]` instead of named keys) is the biggest risk. Done carefully with a one-to-one mapping; visual output preserved.
- Subscribe server function (`src/lib/subscribe.ts`) is updated to look up the Systeme.io tag from the page row by `leadMagnetId` (already on the form payload) — so per-page tags work going forward.
- Mobile (393px) re-tested on both pages after migration.

## Files created / changed

**New:**
- `src/routes/$pageSlug.tsx`
- `src/routes/admin.tsx` (layout) + `admin.index.tsx`, `admin.login.tsx`, `admin.$pageSlug.tsx`
- `src/components/admin/*` (SectionList, SectionEditor, field renderers, page-settings form)
- `src/lib/leadMagnetPages.functions.ts`, `src/lib/leadMagnetPages.server.ts`
- `supabase/migrations/<timestamp>_lead_magnet_pages.sql` (table + RLS + grants + seed)
- `supabase/migrations/<timestamp>_user_roles.sql` (roles table + has_role fn)

**Changed:**
- `src/components/leadMagnet/LeadMagnetPage.tsx` — iterate `sections[]`
- `src/content/leadMagnets/types.ts` — add `Section` union, keep field-level types
- `src/lib/subscribe.ts` — look up tag from DB by `leadMagnetId`
- `EDITING_GUIDE.md` — replace with "use the /admin editor" + how to add a new section type in code

**Deleted (after parity check):**
- `src/routes/thetruth.tsx`, `src/routes/thetruth2.tsx`
- `src/content/leadMagnets/ultraProcessedFoodTrap.ts`, `foodSystemBuiltThisWay.ts`

## What I need from you before building

1. Confirm the caveat above is acceptable (new *instances* free; brand-new section *types* still need a code change).
2. Confirm email/password login is fine, or you'd prefer Google sign-in.
3. The email you want to use as the admin login (I'll add you as the only admin in the seed migration).

Once you approve, I'll enable Lovable Cloud and ship it in one pass.