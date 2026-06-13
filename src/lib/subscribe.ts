import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const subscribeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Consent is required" }),
  }),
  leadMagnetId: z.string().min(1),
});

const DEFAULT_SYSTEME_TAG_ID = 2018014; // LP001TheyKnew — production tag fallback
const SYSTEME_BASE = "https://api.systeme.io/api";

async function resolveTagId(leadMagnetId: string): Promise<number> {
  // Look up tag in lead_magnet_pages by config->>'leadMagnetId' or slug match
  const { data } = await supabaseAdmin
    .from("lead_magnet_pages")
    .select("systeme_tag_id, config")
    .or(`slug.eq.${leadMagnetId},config->>leadMagnetId.eq.${leadMagnetId}`)
    .limit(1)
    .maybeSingle();
  if (data?.systeme_tag_id) return data.systeme_tag_id;
  return DEFAULT_SYSTEME_TAG_ID;
}

function extractId(parsed: unknown): number | undefined {
  if (parsed == null || typeof parsed !== "object") return undefined;
  const p = parsed as Record<string, unknown>;
  if (Array.isArray(p["items"]) && p["items"].length > 0) {
    const first = p["items"][0] as Record<string, unknown>;
    if (typeof first["id"] === "number") return first["id"];
  }
  if (Array.isArray(p["data"]) && p["data"].length > 0) {
    const first = p["data"][0] as Record<string, unknown>;
    if (typeof first["id"] === "number") return first["id"];
  }
  if (p["data"] != null && typeof p["data"] === "object") {
    const d = p["data"] as Record<string, unknown>;
    if (d["contact"] != null && typeof d["contact"] === "object") {
      const c = d["contact"] as Record<string, unknown>;
      if (typeof c["id"] === "number") return c["id"];
    }
  }
  if (p["contact"] != null && typeof p["contact"] === "object") {
    const c = p["contact"] as Record<string, unknown>;
    if (typeof c["id"] === "number") return c["id"];
  }
  if (typeof p["id"] === "number") return p["id"];
  return undefined;
}

export const subscribeToList = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => subscribeSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env.SYSTEME_API_KEY;
    if (!apiKey) {
      throw new Error("SYSTEME_API_KEY is not configured");
    }

    const tagId = await resolveTagId(data.leadMagnetId);

    const headers = {
      "X-API-Key": apiKey,
      "Content-Type": "application/json",
      accept: "application/json",
      // Systeme.io's WAF returns 403 to the default Cloudflare Workers
      // User-Agent. Send a normal-looking UA so requests reach the API.
      "User-Agent": "Mozilla/5.0 (compatible; WellnessBrickdown/1.0; +https://thewellnessbrickdown.com)",
    };

    // Step 1: create contact, or look up existing on 422
    let contactId: number | undefined;

    const contactRes = await fetch(`${SYSTEME_BASE}/contacts`, {
      method: "POST",
      headers,
      body: JSON.stringify({ email: data.email, firstName: data.name }),
    });

    if (contactRes.ok) {
      contactId = extractId(await contactRes.json());
      if (!contactId) {
        console.error("[subscribe] contact created but id missing in response");
        throw new Error("Contact created but no ID returned.");
      }
    } else if (contactRes.status === 422) {
      const lookupRes = await fetch(
        `${SYSTEME_BASE}/contacts?email=${encodeURIComponent(data.email)}`,
        { method: "GET", headers }
      );
      if (!lookupRes.ok) {
        const body = await lookupRes.text().catch(() => "");
        console.error(`[subscribe] contact lookup failed: ${lookupRes.status} ${body}`);
        throw new Error("Something went wrong looking up contact.");
      }
      contactId = extractId(await lookupRes.json());
      if (!contactId) {
        console.error("[subscribe] contact lookup returned no id");
        throw new Error("Could not retrieve existing contact ID.");
      }
    } else {
      const body = await contactRes.text().catch(() => "");
      console.error(`[subscribe] contact creation failed: ${contactRes.status} ${body}`);
      // 403 from systeme.io often indicates the email was flagged (disposable,
      // invalid MX, fraud-protection). Fall back to looking up an existing
      // contact so we can still tag them if they already exist.
      if (contactRes.status === 403) {
        const lookupRes = await fetch(
          `${SYSTEME_BASE}/contacts?email=${encodeURIComponent(data.email)}`,
          { method: "GET", headers }
        );
        if (lookupRes.ok) {
          contactId = extractId(await lookupRes.json());
        }
        if (!contactId) {
          throw new Error("We couldn't accept that email address. Please try a different one.");
        }
      } else {
        throw new Error("Something went wrong creating contact.");
      }
    }

    // Step 2: assign tag — 409/422 means already tagged, treat as success
    const tagRes = await fetch(`${SYSTEME_BASE}/contacts/${contactId}/tags`, {
      method: "POST",
      headers,
      body: JSON.stringify({ tagId }),
    });

    if (!tagRes.ok && tagRes.status !== 409 && tagRes.status !== 422) {
      console.error(`[subscribe] tag assignment failed: ${tagRes.status}`);
      throw new Error("Something went wrong assigning tag.");
    }

    return { ok: true as const };
  });
