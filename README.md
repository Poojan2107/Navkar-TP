# Navkar Tubes & Tools — Website

Fast, SEO-friendly rebuild of [navkartube.com](https://navkartube.com/) using Astro + Tailwind CSS.

## Stack

- **Astro 7** — static site generation
- **Tailwind CSS 4** — styling
- **@astrojs/sitemap** — automatic sitemap
- **FormSubmit** — contact / quote form → `navkartube@gmail.com`

## Requirements

- Node.js **≥ 22.12**

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321)

Background mode (recommended):

```bash
npx astro dev --background
```

Manage with `npx astro dev stop`, `status`, and `logs`.

## Automated yard updates (handover)

Updates publish **automatically** — no daily manual work.

| What | Detail |
|------|--------|
| **Schedule** | Mon, Wed, Fri · 6:30 AM IST (GitHub Actions cron) |
| **Workflow** | `.github/workflows/auto-publish-updates.yml` |
| **Script** | `npm run auto:update` — rotates yard photos + SEO templates |
| **RSS / sitemap** | Refreshes on each deploy (`/updates/rss.xml`) |

### One-time setup (whoever owns the GitHub repo)

1. Push this repo to **GitHub**
2. **Settings → Actions → General** → allow workflows
3. Connect **Netlify / Vercel / Cloudflare Pages** to auto-deploy on push to `main`
4. **Search Console** → submit sitemap + `https://navkartube.com/updates/rss.xml`

### Photos — nothing else needed

All visuals come from **what you already provided** (~90 optimized WebP files):

| Source | Used for |
|--------|----------|
| **28 yard WhatsApp photos** | Updates page, auto-publish cron (rotates forever), product cards |
| **Facility / sign photo** | Homepage hero (cropped to `hero-sign.webp`) |
| **Office Vatva & Rakhial** | Contact page |
| **Jindal certificate** | Jindal partner page |
| **Founder & MD portraits** | About page |
| **Product shots** (fittings, flanges, hydraulic, etc.) | Product pages |

No new photography required to launch. The cron reuses the same yard images with fresh SEO copy — site stays “alive” without you uploading anything.

*(Optional later only: drop new JPEGs in `public/images/navkar/inbox/` if you ever get more.)*

### Manual override

```bash
npm run auto:update              # publish today (skip if exists)
npm run auto:update -- --force   # force second post same day
```

GitHub → **Actions → Auto-publish yard update → Run workflow** (check “force” if needed).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local dev server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |
| `npm run optimize:images` | Re-compress images in `public/images/navkar/` |
| `npm run auto:update` | Auto-publish one yard update (cron uses this) |
| `npm run new:update` | Manual post from inbox (see `scripts/new-update.mjs`) |

## Build & deploy

```bash
npm run build
npm run preview
```

Deploy the **`dist/`** folder to **Vercel**, **Netlify**, or **Cloudflare Pages**.

Config included: `vercel.json`, `netlify.toml`, `public/_redirects`.

### Go-live checklist

1. ~~Photos / emblem~~ — in `public/images/navkar/`
2. ~~Catalogue PDF~~ — `public/catalogue.pdf` (brochure)
3. ~~OG share image~~ — `public/og-image.jpg` (regenerate with `node scripts/make-og-image.mjs`)
4. **FormSubmit** — submit one test enquiry; open FormSubmit’s activation email for `navkartube@gmail.com` (required before live quotes work)
5. **Jindal certificate** — renew and update dates in `src/data/site.ts` (`jindalPartner`) when the new letter arrives
6. ~~Google reviews URL~~ — GBP Knowledge Panel links in `site.googleReviewsUrl` / `site.googleProfiles`
7. ~~Asian / lancing clarity~~ — brand lines on `/products/`; lancing PDP at `/products/lancing-pipes/`
8. **DNS** — point `navkartube.com` to the host; old WP paths redirect automatically
9. **Do not deploy** `wp-content/` or `plugins/` — gitignored / malware risk
10. **GSTIN** — add to `site.ts` / contact / schema when available

Yard hours in schema: Mon–Sat 09:00–19:00. Urgent phone is separate from advertised hours.

## Project layout

```
src/
  components/   UI sections
  data/         site copy, products, reviews, images map
  layouts/      BaseLayout (SEO + schema)
  pages/        routes
  styles/       global.css (Tailwind + brand tokens)
public/
  catalogue.pdf
  images/navkar/
  _redirects
```

## Contact form

Enquiries post to FormSubmit, then redirect to `/thank-you/`.

Product pages deep-link to `/contact/?product=slug` and prefill the product field.

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home |
| `/products/` | Product hub |
| `/products/[slug]/` | Product detail |
| `/about/` | About |
| `/jindal-authorized-partner/` | Jindal partnership |
| `/contact/` | Quote form + locations |
| `/catalogue/` | Brochure download |
| `/privacy/` | Privacy |
| `/thank-you/` | Form success (noindex) |
| `/updates/` | Yard stock updates (auto-published) |
| `/updates/rss.xml` | RSS feed for Google |
| `/locations/[slug]/` | SEO landing pages |

## Brand

- Teal `#59A1A8` · Navy `#005A7B` / `#0a2a38`
- Display: Barlow Condensed · Body: Source Sans 3
