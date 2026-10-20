/**
 * Receives booking and contact requests from the site.
 *
 * Delivery: set BOOKING_WEBHOOK_URL (Zapier, Make, Formspree, a CRM, your own endpoint…) and each request is
 * POSTed there as JSON. Without it nothing is delivered, and the response says so (`delivered: false`) so the UI
 * can hand the visitor an email/phone fallback instead of pretending the request went through.
 */

const hits = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 6;

function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const str = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return Response.json({ ok: false, error: "Too many requests. Please call dispatch." }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    const text = await req.text();
    if (text.length > 20_000) throw new Error("too large");
    body = JSON.parse(text);
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // honeypot: real visitors never fill this in
  if (str(body.website)) return Response.json({ ok: true, delivered: true });

  const kind = body.kind === "contact" ? "contact" : "booking";
  const data = (body.data ?? {}) as Record<string, unknown>;
  const email = str(data.email, 200);
  const name = str(data.name, 120);
  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return Response.json({ ok: false, error: "Name and a valid email are required." }, { status: 422 });
  }

  const ref = str(body.ref, 24) || `WL-${Date.now().toString(36).toUpperCase()}`;
  const payload = { kind, ref, data, receivedAt: new Date().toISOString(), source: "winnlimo.com" };

  const webhook = process.env.BOOKING_WEBHOOK_URL;
  if (!webhook) {
    console.info(`[request] ${kind} ${ref} received but BOOKING_WEBHOOK_URL is not set — not delivered`);
    return Response.json({ ok: true, delivered: false, ref });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`webhook responded ${res.status}`);
    return Response.json({ ok: true, delivered: true, ref });
  } catch (err) {
    console.error(`[request] webhook delivery failed for ${ref}:`, err instanceof Error ? err.message : err);
    return Response.json({ ok: true, delivered: false, ref });
  }
}
