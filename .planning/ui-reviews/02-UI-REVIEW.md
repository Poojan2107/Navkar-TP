# Phase 02 — UI Review

**Audited:** 2026-07-22  
**Baseline:** User-provided homepage mockup (full-bleed facility hero, horizontal product cards, vertical industry cards, white product cards, Jindal split, Why Choose Us grid, FAQ accordion, dark contact form) + abstract 6-pillar standards  
**Screenshots:** captured (Astro dev on `localhost:4321`) → `.planning/ui-reviews/02-20260722-144025/`  
**Registry audit:** skipped (no root `components.json` / shadcn)

---

## Pillar Scores

| Pillar | Score | Key Finding |
|--------|-------|-------------|
| 1. Copywriting | 3/4 | Buyer-specific CTAs and FAQ copy are strong; repeated “Need pipes…” band and passive empty-state copy weaken polish |
| 2. Visuals | 2/4 | Split hero crops teal sign behind gate; team portrait asset defect; mockup’s cinematic full-bleed hero not achieved |
| 3. Color | 4/4 | Teal/navy token system (`global.css` `@theme`) applied consistently across components |
| 4. Typography | 3/4 | Barlow Condensed + Source Sans 3 hierarchy works; many one-off `text-[14px]`/`text-[15px]` sizes and heavy ALL-CAPS |
| 5. Spacing | 3/4 | Shared `section-padding` / `container-narrow` rhythm; hero left panel overcrowded (badges + stats duplicate `StatsBand`) |
| 6. Experience Design | 2/4 | Updates index empty in live dev; reveal opacity hides below-fold content; CTA bands on 6+ page types |

**Overall: 17/24**

---

## Verdict

**Polish — with hero rework required before calling the homepage “mockup-aligned.”**

The site is functionally solid B2B (products, Jindal proof, FAQ, contact form, industry tiles). It is not yet the cinematic/editorial mockup. Do **not** ship the homepage hero as-is if mockup fidelity is the bar; interior pages can ship after targeted fixes (team photo asset, CTA deduplication, reveal visibility).

---

## Top 5 Priority Fixes (by impact)

1. **Rework homepage hero for sign-first, full-bleed photography** — Mockup centers the facility/sign; live split hero (`Hero.astro` L9–27) uses `object-[72%_38%] lg:object-[58%_36%]`, framing the metal gate and cropping “NAVKAR” off the sign. **Fix:** switch to full-bleed hero (mockup layout), reposition to `object-[center_30%]` or a cropped `facility-sign` asset, move stats grid out of hero (duplicates `StatsBand`), reduce badge count above fold.

2. **Replace corrupted founder portrait asset** — `public/images/navkar/shripal-shah.webp` has a baked-in horizontal blue/purple bar across the lower third (source file defect, not CSS). `harsh-shah.webp` is clean. **Fix:** re-export/replace `shripal-shah.webp` from original; verify on `/about/` at `about/index.astro` L115–124.

3. **Fix Updates index showing “No updates yet”** — Screenshot and live dev HTML show empty state (`updates/index.astro` L78–79) despite 13 files in `src/content/updates/` and successful production build (`dist/updates/` has all entries, no “No updates yet”). **Fix:** restart dev server after `astro sync`; if persistent, debug `glob` loader in `content.config.ts`. Improve empty-state copy + yard photo placeholder if collection is genuinely empty.

4. **Consolidate quote CTAs — stop band fatigue** — Identical `CtaBand` (“Need pipes for your project?”) on About, Products, every PDP, Catalogue, and SEO landings (`CtaBand.astro` L9–10), plus homepage `ContactSection`, `UpdatesRfqBand` on updates pages, header “Get quote”, and mobile CTA bar. **Fix:** keep one primary conversion path per page type; remove `CtaBand` from PDPs or replace interior pages with inline contextual CTAs only.

5. **Make below-fold content visible without scroll-triggered reveal** — Interior pages (About full-page screenshot) show large white gaps: `Reveal` defaults to `opacity: 0` (`global.css` L290–296) until IntersectionObserver fires. Users and crawlers see blank sections. **Fix:** add `is-visible` to above-fold reveals server-side, or use `@media (prefers-reduced-motion)` / noscript pattern for all reveals; limit reveal to optional motion enhancement only.

---

## Mockup Gap Analysis

| Mockup element | Implemented? | Gap |
|----------------|--------------|-----|
| Full-bleed facility photo hero | Partial | Split 46/54 cinematic panel (`hero-cinematic-grid`); photo secondary to dense left copy |
| Teal sign as hero focal point | No | `object-position` favors gate; sign partially cropped (“UBES & TOOLS” visible in screenshot) |
| Product range horizontal cards | Partial | Portal bento in `Hero.astro` L106–145 is grid/bento, not horizontal scroll strip |
| Vertical industry sunset cards | Yes | `WhyNavkarIntro.astro` — `aspect-[3/4]` tiles with gradient scrim |
| White product cards (flanges/hydraulic/hollow) | Yes | `ProductRange.astro` — white cards, numbered, product imagery |
| Jindal certificate split section | Yes | `JindalBand.astro` — copy left, certificate right |
| Why Choose Us grid | No | `valueCards` defined in `site.ts` L130–146 but **never rendered**; replaced by `TrustMarquee` + `StatsBand` |
| FAQ accordion | Yes | `FaqSection.astro` — native `<details>` accordion |
| Dark contact form section | Yes | `ContactSection.astro` — navy left panel + white form |
| Cinematic / editorial tone | No | Functional B2B template: marquees, duplicate stats, repeated CTA bands |

**Homepage section order vs mockup:** Trust marquee and duplicate proof (`StatsBand` after `WhyNavkarIntro`) add template noise not in mockup. `Reviews` + `SeoIntro` are extra SEO blocks beyond mockup scope.

---

## Detailed Findings

### Pillar 1: Copywriting (3/4)

**Strengths**
- Hero headline is specific: “Single source for complete pipe solution” with Jindal/Gujarat context (`Hero.astro` L43–51).
- CTAs are action-oriented: “Get free quote”, “Browse products”, “Request quote” — no generic “Submit” or “Click Here” in chrome (form uses “Submit enquiry” appropriately in `QuoteForm.astro`).
- FAQ questions are search-intent aligned (`FaqSection.astro` L11–15).
- Industry tiles use “Request quote →” with `sr-only` fallback (`WhyNavkarIntro.astro` L37–41).

**Gaps**
- `CtaBand.astro` L9–14 repeats identical headline on 6+ routes — feels templated, not editorial.
- Updates empty state is passive: “No updates yet — check back soon.” (`updates/index.astro` L79) — should invite WhatsApp/call when yard content exists elsewhere (footer lists updates).
- `valueCards` copy (“Stock & speed”, “Authorized supply”) unused — mockup “Why Choose Us” narrative missing.

### Pillar 2: Visuals (2/4)

**Confirmed from screenshots**
- Desktop/mobile hero: metal sliding gate dominates right panel; teal sign not hero focal point (`Hero.astro` L19, `facility-signed.webp` framing).
- Left hero panel dense: 3 badges + headline + body + 2 CTAs + 4-cell stats grid + phone link (`Hero.astro` L35–80).
- About team: `shripal-shah.webp` has horizontal bar artifact in source file (asset bug).
- About page below-fold sections invisible until reveal JS runs (large white gap in full-page capture).

**Mockup alignment**
- Mockup implies single full-bleed hero with typography overlay; current split-panel reads as SaaS/industrial template.
- Product portals use dark scrim cards — closer to mockup product section than white `ProductRange` cards (both exist, creating visual repetition).

**Minor**
- `accent-line` in `SectionHeading.astro` stays `scaleX(0)` until parent `.is-visible` — decorative line invisible on first paint.

### Pillar 3: Color (4/4)

- Centralized tokens: `--color-teal-500: #59a1a8`, `--color-navy-brand: #005a7b`, `--color-navy-950: #0a2a38` (`global.css` L47–58).
- Accent used on CTAs, eyebrows, links — not over-applied on decorative elements.
- Dark contact section (`ContactSection.astro`) and navy header-over-dark (`Header.astro` + `global.css` L451–496) match brand plane.
- Jindal green `--color-jindal` reserved for partnership contexts.

No inappropriate hardcoded hex in components (CSS layer only).

### Pillar 4: Typography (3/4)

- Display/body split: `font-display` (Barlow Condensed 600–800) vs `font-sans` (Source Sans 3) — self-hosted, `font-display: swap`.
- Utility classes `.text-meta`, `.text-body`, `.text-lead` defined (`global.css` L116–126) but inconsistently adopted.
- Distinct sizes in active use: `text-[10px]` through `text-4xl`, plus `clamp()` hero headline — **>4 sizes** when counting arbitrary values.
- Section titles uniformly `uppercase` + `tracking-tight` — readable for industrial brand but reduces editorial mockup feel.

### Pillar 5: Spacing (3/4)

- `section-padding` (`px-4 py-10` → `lg:py-14`) and `container-narrow` (`max-w-7xl`) used consistently across audited components.
- Hero stats grid (`Hero.astro` L63–72) duplicates `StatsBand` / `proofBand` on same homepage scroll — unnecessary vertical density.
- Arbitrary spacing exists but is moderate: `gap-3`, `py-7`, `mb-7` — mostly Tailwind scale; `text-[15px]` pairs with `leading-relaxed` throughout.
- `ProductRange` / `JindalBand` / `FaqSection` spacing matches interior pages — coherent rhythm.

### Pillar 6: Experience Design (2/4)

**State coverage**
- Quote form: failure recovery and abort handling present (`QuoteForm.astro` — noted in prior review).
- FAQ: native accordion, keyboard-accessible `<details>`.
- No loading states needed for static content — appropriate.
- Empty state on updates index **incorrectly shown in dev** despite 13 content entries and successful `npm run build`.

**Interaction issues**
- `Reveal` + `data-stat` opacity (`global.css` L290–296, L358–364) hides content before JS — About leadership/stats sections appear blank.
- Mobile CTA bar + floating actions + header quote + page CtaBand + footer links = conversion overload.
- `LatestUpdates.astro` conditionally omits entire section when `posts.length === 0` — homepage may lack yard social proof if collection fails (same root cause as updates index).

**Missing vs mockup**
- `valueCards` never wired — “Why Choose Us” grid absent.

---

## Files Audited

- `src/components/Hero.astro`
- `src/pages/index.astro`
- `src/styles/global.css`
- `src/components/Header.astro`, `Footer.astro`
- `src/components/WhyNavkarIntro.astro`, `StatsBand.astro`, `LatestUpdates.astro`, `ProductRange.astro`, `JindalBand.astro`, `ContactSection.astro`, `FaqSection.astro`, `Reviews.astro`
- `src/components/CtaBand.astro`, `SectionHeading.astro`, `Reveal.astro`, `MotionInit.astro`, `TrustMarquee.astro`, `UpdatesRfqBand.astro`
- `src/pages/products/index.astro`, `src/pages/about/index.astro`, `src/pages/updates/index.astro`
- `src/data/site.ts`, `src/data/images.ts`, `src/content.config.ts`
- Assets: `public/images/navkar/shripal-shah.webp`, `harsh-shah.webp`, `facility-signed.webp`
- Screenshots: `.planning/ui-reviews/02-20260722-144025/`

---

## UI REVIEW COMPLETE

**Phase:** 02 — Mockup alignment & homepage polish  
**Overall Score:** 17/24  
**Screenshots:** captured

### Pillar Summary
| Pillar | Score |
|--------|-------|
| Copywriting | 3/4 |
| Visuals | 2/4 |
| Color | 4/4 |
| Typography | 3/4 |
| Spacing | 3/4 |
| Experience Design | 2/4 |

### Top 5 Fixes
1. Rework hero — full-bleed, sign-first focal point, declutter stats/badges
2. Replace `shripal-shah.webp` (baked-in bar artifact)
3. Fix updates collection empty state in dev / improve empty UX
4. Deduplicate `CtaBand` across interior pages
5. Default reveal content visible without scroll (fix About blank gaps)

### File Created
`d:\Navkar\.planning\ui-reviews\02-UI-REVIEW.md`

### Recommendation Count
- Priority fixes: 5
- Minor recommendations: 4 (wire `valueCards`, horizontal product scroll, consolidate `text-[15px]` tokens, `accent-line` first-paint)
