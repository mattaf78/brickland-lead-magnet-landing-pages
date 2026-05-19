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

    // Step 1: create or update contact
    const contactRes = await fetch(`${SYSTEME_BASE}/contacts`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email: data.email,
        firstName: data.name,
      }),
    });

    if (!contactRes.ok) {
      const body = await contactRes.text();
      console.error(`[subscribe] contact creation failed ${contactRes.status}: ${body}`);
      throw new Error("Something went wrong creating contact.");
    }

    const contact = await contactRes.json() as { id?: number };
    const contactId = contact.id;

    if (!contactId) {
      console.error("[subscribe] contact response missing id:", JSON.stringify(contact));
      throw new Error("Contact created but no ID returned.");
    }

    // Step 2: assign tag to contact
    const tagRes = await fetch(
      `${SYSTEME_BASE}/contacts/${contactId}/tags`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({ tagId: SYSTEME_TAG_ID }),
      }
    );

    if (!tagRes.ok) {
      const body = await tagRes.text();
      console.error(`[subscribe] tag assignment failed ${tagRes.status}: ${body}`);
      throw new Error("Something went wrong assigning tag.");
    }

    return { ok: true as const };
  });
