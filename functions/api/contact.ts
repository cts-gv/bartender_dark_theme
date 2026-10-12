/**
 * POST /api/contact
 *
 * Cloudflare Pages Function. Flow:
 *   1. Same-origin + JSON + size checks
 *   2. Honeypot check (bots that fill the hidden field get a fake success)
 *   3. Server-side validation of every field
 *   4. Turnstile token verification
 *   5. Notification email to the owner (reply-to = customer)
 *   6. Confirmation email to the customer (best effort)
 *
 * Required environment variables / secrets (Pages > Settings > Variables and Secrets):
 *   RESEND_API_KEY        (secret)
 *   TURNSTILE_SECRET_KEY  (secret)
 *   OWNER_EMAIL           where inquiries are delivered (your personal email)
 *   FROM_EMAIL            a sender on your Resend-verified domain, e.g. bookings@yourdomain.com
 *   BUSINESS_NAME         (optional) used in email copy
 */

interface Env {
  RESEND_API_KEY: string;
  TURNSTILE_SECRET_KEY: string;
  OWNER_EMAIL: string;
  FROM_EMAIL: string;
  BUSINESS_NAME?: string;
}

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  eventType?: unknown;
  eventDate?: unknown;
  guestCount?: unknown;
  message?: unknown;
  website?: unknown; // honeypot
  turnstileToken?: unknown;
}

const MAX_BODY_BYTES = 10_000;
const EVENT_TYPES = ['Wedding', 'Corporate Event', 'Private Party', 'Other'];

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

/** Escape text for safe inclusion in HTML emails. */
const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

/** Collapse whitespace/newlines so user text can never inject email headers. */
const oneLine = (s: string) => s.replace(/\s+/g, ' ').trim();

const str = (v: unknown, max: number) =>
  typeof v === 'string' ? v.trim().slice(0, max) : '';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  // --- Config sanity check (fail loudly in logs, generically to the client) ---
  if (!env.RESEND_API_KEY || !env.TURNSTILE_SECRET_KEY || !env.OWNER_EMAIL || !env.FROM_EMAIL) {
    console.error('contact: missing required environment variables');
    return json({ ok: false, error: 'Server is not configured.' }, 500);
  }

  // --- Same-origin check: blocks other websites from posting to this endpoint ---
  let sameOrigin = false;
  try {
    const origin = request.headers.get('Origin');
    sameOrigin = !!origin && new URL(origin).host === new URL(request.url).host;
  } catch {
    sameOrigin = false; // e.g. "Origin: null"
  }
  if (!sameOrigin) return json({ ok: false, error: 'Forbidden.' }, 403);

  if (!(request.headers.get('Content-Type') ?? '').includes('application/json')) {
    return json({ ok: false, error: 'Unsupported content type.' }, 415);
  }

  // --- Read body with a hard size cap ---
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return json({ ok: false, error: 'Message is too long.' }, 413);
  }
  let body: ContactPayload;
  try {
    body = JSON.parse(raw) as ContactPayload;
  } catch {
    return json({ ok: false, error: 'Invalid request.' }, 400);
  }

  // --- Honeypot: real people never see/fill this field. Pretend success. ---
  if (typeof body.website === 'string' && body.website.length > 0) {
    return json({ ok: true });
  }

  // --- Validate ---
  const name = oneLine(str(body.name, 100));
  const email = str(body.email, 254);
  const phone = oneLine(str(body.phone, 30));
  const eventType = str(body.eventType, 40);
  const eventDate = str(body.eventDate, 10);
  const message = str(body.message, 3000);
  const guestCountRaw = str(String(body.guestCount ?? ''), 6);
  const token = str(body.turnstileToken, 2048);

  const errors: string[] = [];
  if (name.length < 2) errors.push('Please enter your name.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.push('Please enter a valid email address.');
  if (message.length < 5) errors.push('Please tell us a bit about your event.');
  if (phone && !/^[0-9+().\-\s]{7,30}$/.test(phone)) errors.push('Please enter a valid phone number.');
  if (eventType && !EVENT_TYPES.includes(eventType)) errors.push('Please choose a valid event type.');
  if (eventDate && !/^\d{4}-\d{2}-\d{2}$/.test(eventDate)) errors.push('Please enter a valid event date.');
  let guestCount = '';
  if (guestCountRaw) {
    const n = Number(guestCountRaw);
    if (!Number.isInteger(n) || n < 1 || n > 10000) errors.push('Guest count must be a whole number.');
    else guestCount = String(n);
  }
  if (!token) errors.push('Please complete the verification check.');
  if (errors.length) return json({ ok: false, error: errors[0] }, 400);

  // --- Verify Turnstile token server-side ---
  const verifyBody = new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: token });
  const ip = request.headers.get('CF-Connecting-IP');
  if (ip) verifyBody.set('remoteip', ip);

  let verified = false;
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: verifyBody,
    });
    const data = (await res.json()) as { success?: boolean };
    verified = data.success === true;
  } catch (err) {
    console.error('contact: turnstile verification request failed', err);
    return json({ ok: false, error: 'Verification service unavailable. Please try again.' }, 502);
  }
  if (!verified) {
    return json({ ok: false, error: 'Verification failed. Please try again.' }, 400);
  }

  // --- Send emails via Resend ---
  const business = oneLine(env.BUSINESS_NAME || 'Our team');
  const sendEmail = (payload: Record<string, unknown>) =>
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

  const row = (label: string, value: string) =>
    `<tr><td style="padding:4px 12px 4px 0;color:#666">${label}</td><td style="padding:4px 0"><b>${esc(value || '—')}</b></td></tr>`;

  const ownerHtml = `
    <h2 style="margin:0 0 12px">New event inquiry</h2>
    <table style="border-collapse:collapse;font-family:sans-serif;font-size:15px">
      ${row('Name', name)}
      ${row('Email', email)}
      ${row('Phone', phone)}
      ${row('Event type', eventType)}
      ${row('Event date', eventDate)}
      ${row('Guests', guestCount)}
    </table>
    <p style="font-family:sans-serif;font-size:15px;white-space:pre-wrap;margin-top:16px">${esc(message)}</p>
    <p style="font-family:sans-serif;font-size:12px;color:#888">Hit Reply to respond directly to ${esc(name)}.</p>`;

  let ownerRes: Response;
  try {
    ownerRes = await sendEmail({
      from: `${business} Website <${env.FROM_EMAIL}>`,
      to: [env.OWNER_EMAIL],
      reply_to: email,
      subject: `New inquiry from ${name}${eventType ? ` (${eventType})` : ''}`,
      html: ownerHtml,
    });
  } catch (err) {
    console.error('contact: resend request failed', err);
    return json({ ok: false, error: 'Could not send your message. Please try again.' }, 502);
  }
  if (!ownerRes.ok) {
    console.error('contact: resend rejected owner email', ownerRes.status, await ownerRes.text());
    return json({ ok: false, error: 'Could not send your message. Please try again.' }, 502);
  }

  // Confirmation to the customer: best effort. The inquiry already reached you,
  // so a failure here must not show the customer an error.
  try {
    const confirmRes = await sendEmail({
      from: `${business} <${env.FROM_EMAIL}>`,
      to: [email],
      subject: `We received your inquiry, ${name.split(' ')[0]}!`,
      html: `
        <div style="font-family:sans-serif;font-size:15px;line-height:1.6;max-width:520px">
          <p>Hi ${esc(name.split(' ')[0])},</p>
          <p>Thanks for reaching out to ${esc(business)}! We received your inquiry${
            eventDate ? ` for <b>${esc(eventDate)}</b>` : ''
          } and will get back to you within 24 hours.</p>
          <p style="color:#666;margin-bottom:4px">Here's what you sent us:</p>
          <blockquote style="margin:0;padding-left:12px;border-left:3px solid #ddd;white-space:pre-wrap">${esc(message)}</blockquote>
          <p>Talk soon,<br>${esc(business)}</p>
        </div>`,
    });
    if (!confirmRes.ok) {
      console.error('contact: resend rejected confirmation email', confirmRes.status, await confirmRes.text());
    }
  } catch (err) {
    console.error('contact: confirmation email failed', err);
  }

  return json({ ok: true });
};

// Anything other than POST gets a clear 405 instead of falling through to the SPA.
export const onRequest: PagesFunction<Env> = async () =>
  new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
