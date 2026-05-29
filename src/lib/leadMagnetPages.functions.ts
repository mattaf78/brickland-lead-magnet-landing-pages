import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { LeadMagnetConfig } from "@/content/leadMagnets/types";

export type PageRow = {
  id: string;
  slug: string;
  title: string;
  config: LeadMagnetConfig;
  systeme_tag_id: number | null;
  published: boolean;
  updated_at: string;
};

async function assertAdmin(supabase: any, userId: string) {
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden: admin role required");
}

// PUBLIC: fetch a published page by slug (used by /thetruth, /thetruth2, etc.)
export const getPublishedPageBySlug = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) =>
    z.object({ slug: z.string().min(1).max(64) }).parse(data),
  )
  .handler(async ({ data }): Promise<PageRow | null> => {
    const { data: row, error } = await supabaseAdmin
      .from("lead_magnet_pages")
      .select("id, slug, title, config, systeme_tag_id, published, updated_at")
      .eq("slug", data.slug)
      .eq("published", true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return (row as PageRow | null) ?? null;
  });

// ADMIN: list all pages
export const listPages = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { data, error } = await supabaseAdmin
      .from("lead_magnet_pages")
      .select("id, slug, title, published, updated_at")
      .order("updated_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

// ADMIN: get any page by slug
export const getPageForEditor = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z.object({ slug: z.string().min(1).max(64) }).parse(data),
  )
  .handler(async ({ data, context }): Promise<PageRow | null> => {
    await assertAdmin(context.supabase, context.userId);
    const { data: row, error } = await supabaseAdmin
      .from("lead_magnet_pages")
      .select("id, slug, title, config, systeme_tag_id, published, updated_at")
      .eq("slug", data.slug)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return (row as PageRow | null) ?? null;
  });

// ADMIN: update a page
export const updatePage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        title: z.string().min(1).max(255).optional(),
        slug: z.string().min(1).max(64).regex(/^[a-z0-9-]+$/).optional(),
        config: z.unknown().optional(),
        systeme_tag_id: z.number().int().nullable().optional(),
        published: z.boolean().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (data.title !== undefined) patch.title = data.title;
    if (data.slug !== undefined) patch.slug = data.slug;
    if (data.config !== undefined) patch.config = data.config;
    if (data.systeme_tag_id !== undefined) patch.systeme_tag_id = data.systeme_tag_id;
    if (data.published !== undefined) patch.published = data.published;
    const { error } = await supabaseAdmin
      .from("lead_magnet_pages")
      .update(patch)
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

// ADMIN: create a new page (duplicate from an existing one)
export const createPage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        slug: z.string().min(1).max(64).regex(/^[a-z0-9-]+$/),
        title: z.string().min(1).max(255),
        fromSlug: z.string().min(1).max(64).optional(),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    let config: unknown = {};
    let systeme_tag_id: number | null = null;
    if (data.fromSlug) {
      const { data: src, error: srcErr } = await supabaseAdmin
        .from("lead_magnet_pages")
        .select("config, systeme_tag_id")
        .eq("slug", data.fromSlug)
        .maybeSingle();
      if (srcErr) throw new Error(srcErr.message);
      if (src) {
        config = src.config;
        systeme_tag_id = src.systeme_tag_id;
      }
    }
    const { error } = await supabaseAdmin.from("lead_magnet_pages").insert({
      slug: data.slug,
      title: data.title,
      config,
      systeme_tag_id,
      published: false,
    });
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const deletePage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z.object({ id: z.string().uuid() }).parse(data),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await supabaseAdmin
      .from("lead_magnet_pages")
      .delete()
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });