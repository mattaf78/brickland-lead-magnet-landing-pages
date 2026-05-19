import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const subscribeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Consent is required" }),
  }),
  leadMagnetId: z.string().min(1),
});

const SYSTEME_TAG_ID = 2017456;
const SYSTEME_BASE = "https://api.systeme.io/api";

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

    const headers = {
      "X-API-Key": apiKey,
      "Content-Type": "application/json",
      accept: "application/json",
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
        console.error(`[subscribe] contact lookup failed: ${lookupRes.status}`);
        throw new Error("Something went wrong looking up contact.");
      }
      contactId = extractId(await lookupRes.json());
      if (!contactId) {
        console.error("[subscribe] contact lookup returned no id");
        throw new Error("Could not retrieve existing contact ID.");
      }
    } else {
      console.error(`[subscribe] contact creation failed: ${contactRes.status}`);
      throw new Error("Something went wrong creating contact.");
    }

    // Step 2: assign tag — 409/422 means already tagged, treat as success
    const tagRes = await fetch(`${SYSTEME_BASE}/contacts/${contactId}/tags`, {
      method: "POST",
      headers,
      body: JSON.stringify({ tagId: SYSTEME_TAG_ID }),
    });

    if (!tagRes.ok && tagRes.status !== 409 && tagRes.status !== 422) {
      console.error(`[subscribe] tag assignment failed: ${tagRes.status}`);
      throw new Error("Something went wrong assigning tag.");
    }

    return { ok: true as const };
  });
