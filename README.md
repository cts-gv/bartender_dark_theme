# Mobile Bartender Site

Vite + React + TypeScript + Tailwind, hosted on Cloudflare Pages. The contact form posts to a
Pages Function (`functions/api/contact.ts`) that verifies Cloudflare Turnstile and sends email through Resend.

All site copy, images and contact details live in `src/config/siteConfig.ts`.

## One-time setup

### 1. Resend
1. Create an account at resend.com and **add + verify your domain** (adds SPF/DKIM DNS records).
2. Create an API key.
3. Pick a sender on that domain, e.g. `bookings@yourdomain.com`.

### 2. Turnstile
1. Cloudflare dashboard > Turnstile > Add widget. Add your domain (and your `*.pages.dev` hostname for previews).
2. Copy the **Site Key** (public) and **Secret Key** (private).

### 3. Cloudflare Pages
Connect the GitHub repo, then:

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Build output directory | `dist` |
| Env var `NODE_VERSION` | `20` (or newer) |
| Env var `VITE_TURNSTILE_SITE_KEY` | your Turnstile **site** key (build-time, public) |
| Secret `TURNSTILE_SECRET_KEY` | your Turnstile **secret** key |
| Secret `RESEND_API_KEY` | your Resend API key |
| Env var `OWNER_EMAIL` | the inbox that should receive inquiries |
| Env var `FROM_EMAIL` | e.g. `bookings@yourdomain.com` (must be on your verified Resend domain) |
| Env var `BUSINESS_NAME` | your business name (used in email copy) |

Set variables for both **Production** and **Preview** if you want previews to work.
After changing variables, redeploy. Never put the Resend or Turnstile *secret* in a `VITE_` variable;
those get bundled into public JavaScript.

## Local development

```bash
npm install
cp .env.example .env              # test Turnstile site key (always passes)
cp .dev.vars.example .dev.vars    # fill in RESEND_API_KEY, OWNER_EMAIL, FROM_EMAIL

npm run build                     # wrangler serves the built files
npm run dev:api                   # terminal 1: Pages Functions on :8788
npm run dev                       # terminal 2: Vite on :5173 (proxies /api to :8788)
```

Useful checks: `npm run typecheck`, `npm run lint`, `npm run build`.

Until your domain is verified in Resend, Resend only lets you send to your own account email,
so test with `OWNER_EMAIL` set to the address you signed up with.

## Before launch checklist
- [ ] Replace "Business Name", email, phone, and social links in `src/config/siteConfig.ts`
- [ ] Update `yourdomain.com` in `index.html`, `public/robots.txt`, `public/sitemap.xml`
- [ ] Replace stock Pexels photos/video with your own files in `public/` (25 MB per-file limit on Pages)
- [ ] Add a real 1200x630 `og:image` and a real favicon (`public/favicon.svg` is a placeholder)
- [ ] Replace the placeholder stats ("500+ events", "100% happy clients") with true numbers
- [ ] Verify your Resend domain, submit a test inquiry, confirm both emails arrive
- [ ] Review `public/_headers` (Content-Security-Policy) after adding any new third-party scripts/embeds
