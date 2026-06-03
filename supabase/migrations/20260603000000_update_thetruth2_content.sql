-- ============================================================
-- Update /thetruth2 (WB002) page content in Supabase
-- ============================================================
-- Changes applied:
--   1. classificationBarText  — remove "LP002"
--   2. fieldReportLabel       — empty string (hides navbar field-report tag)
--   3. sectionLabels.discover — "Inside What You'll Learn"
--   4. discover.title         — empty (section label becomes sole heading)
--   5. preview.title          — empty (section label becomes sole heading)
--   6. callout.visible        — false (removes "This Is Not a Diet Guide" section)
-- ============================================================

UPDATE public.lead_magnet_pages
SET
  config = config
    -- top-level string fields
    || jsonb_build_object(
         'classificationBarText', 'Wellness Brickdown — Educational Content Only — Not Medical Advice',
         'fieldReportLabel',      ''
       )
    -- sectionLabels.discover
    || jsonb_build_object(
         'sectionLabels', COALESCE(config->'sectionLabels', '{}'::jsonb)
           || jsonb_build_object('discover', 'Inside What You''ll Learn')
       )
    -- discover.title
    || jsonb_build_object(
         'discover', COALESCE(config->'discover', '{}'::jsonb)
           || jsonb_build_object('title', '')
       )
    -- preview.title
    || jsonb_build_object(
         'preview', COALESCE(config->'preview', '{}'::jsonb)
           || jsonb_build_object('title', '')
       )
    -- callout.visible = false
    || jsonb_build_object(
         'callout', COALESCE(config->'callout', '{}'::jsonb)
           || jsonb_build_object('visible', false)
       ),
  updated_at = now()
WHERE slug = 'thetruth2';
