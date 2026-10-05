import { getEmail } from '@/lib/site';

export const runtime = 'nodejs';

type Payload = Record<string, unknown>;

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]!);

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

// Best-effort per-instance throttle; real abuse protection belongs at the edge (Vercel Firewall).
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (limited(ip)) return Response.json({ ok: false }, { status: 429 });

  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  // Honeypot: pretend success so bots learn nothing.
  if (str(body.website, 200)) return Response.json({ ok: true });

  const name = str(body.name, 120);
  const email = str(body.email, 200);
  const subject = str(body.subject, 200);
  const message = str(body.message, 5000);
  if (!name || !subject || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set; contact form message was not delivered.');
    return Response.json({ ok: false }, { status: 503 });
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? 'Portfolio <onboarding@resend.dev>',
      to: [process.env.CONTACT_TO ?? getEmail()],
      reply_to: email,
      subject: `[olebrande.no] ${subject}`,
      html: `<p><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
      text: `${name} <${email}>\n\n${message}`,
    }),
  });

  if (!res.ok) {
    console.error('Resend error', res.status, await res.text());
    return Response.json({ ok: false }, { status: 502 });
  }
  return Response.json({ ok: true });
}
