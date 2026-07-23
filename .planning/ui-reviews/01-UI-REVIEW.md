# Phase 01 — UI Review (Final Go-Live Gate)

**Audited:** 2026-07-22  
**Baseline:** Abstract 6-pillar standards (no UI-SPEC.md); delta vs `00-UI-REVIEW.md` (2026-07-19)  
**Screenshots:** captured (Astro dev on `localhost:4321`) → `.planning/ui-reviews/01-20260722-115740/`  
**Site:** Navkar Tubes & Tools — Astro + Tailwind B2B rebuild of navkartube.com  
**Registry audit:** skipped (no root `components.json` / shadcn)

---

## Pillar Scores

| Pillar | Score | Key Finding |
|--------|-------|-------------|
| 1. Copywriting | 4/4 | Buyer-specific CTAs; SEO weave is natural; prior form/privacy issues not regressed |
| 2. Visuals | 3/4 | Brand-first hero and real facility/people photos land; lancing PDP reuses spiral art |
| 3. Color | 4/4 | Teal `#59A1A8` / navy `#005A7B` / `#0a2a38` tokens complete incl. teal-200/300 |
| 4. Typography | 4/4 | Self-hosted Barlow Condensed + Source Sans 3; clear display/body roles |
| 5. Spacing | 4/4 | Shared `section-padding` / `container-narrow`; navbar collapse rhythm is clean |
| 6. Experience Design | 3/4 | Form failure recovery + delayed mobile CTA good; deferred reveal init blanks first paint |

**Overall: 22/24**

---

## Go / No-Go (Visual Polish)

### Verdict: **GO** for visual polish — with **1 BLOCK** content fix before public publish

Ops (out of scope for this UI gate): FormSubmit inbox activation, DNS/cutover.

### BLOCK / must-fix before deploy

1. **Lancing pipes product image is wrong** — `src/data/images.ts` maps `'lancing-pipes': '/images/navkar/spiral.webp'` (same asset as Spiral Pipes). Buyers on `/products/lancing-pipes/` and the products grid see the wrong product. **Fix:** swap in a real lancing / coated-pipe photo under `/public/images/navkar/` and update the map (or temporarily hide the card until art exists).

### Optional polish (do not block deploy)

- Call `initReveal()` immediately in `MotionInit.astro` (or mark above-fold `Reveal` as `is-visible` by default). Today reveal init runs inside `requestIdleCallback` (timeout 900ms), so first paint / early screenshots show empty white sections under PageHero until JS idles — regression from motion/speed work, not a permanent blank.
- Contact urgent actions still use short labels “WhatsApp” / “Email” (`contact/index.astro` ~126–132); homepage `CtaBand` already says “WhatsApp sales”.
- Industry tile “Request quote →” is `sm:opacity-0` until hover (`WhyNavkarIntro.astro` ~37–39) — fine on desktop mouse, weak on large touch screens (link + `sr-only` still work).
- Consolidate remaining `text-[15px]` / `text-[1.9rem]` one-offs onto `.text-body` / section title tokens (already started in `global.css`).

### Prior review items — status (do not re-litigate)

| Prior fix | Status |
|-----------|--------|
| Define `teal-200` / `teal-300` in `@theme` | **Fixed** (`global.css` ~50–51) |
| Quote form failure recovery | **Fixed** (`QuoteForm.astro` error box + 15s abort + re-enable) |
| Industry tiles actionable | **Fixed** (links to `/contact/?sector=…`) |
| OG `og-image.jpg`, privacy footer, FormSubmit fields, soft Jindal dates | **Not regressed** |

---

## Top 3 Priority Fixes

1. **Lancing pipes uses spiral.webp** — Misleads buyers on a manufactured line — Replace image mapping in `src/data/images.ts` (+ asset).
2. **Deferred `initReveal` blanks first paint** — Interior pages look empty for up to ~1s — Run reveal init synchronously or default in-view reveals visible (`MotionInit.astro` ~157–169).
3. **Contact quick-action labels** — Inconsistent with rest of site — Change to “WhatsApp sales” / “Email us” in `contact/index.astro`.

---

## Detailed Findings

### Pillar 1: Copywriting (4/4)

**Strengths**
- Hero CTAs remain specific: “Get free quote”, “Browse products” (`Hero.astro` ~66–72).
- PDP CTAs: “Get quote — {title}”, “WhatsApp this product” (`products/[slug].astro` ~188–200).
- Form: B2B fields (Size / OD, Quantity, Delivery city); submit “Submit enquiry”; failure copy with call + WhatsApp (`QuoteForm.astro` ~117–127).
- Products index separates **Jindal authorized** vs **Also available** with honest stockist language (`products/index.astro` + `brandLines` in `site.ts`).
- SEO (`seo.ts`): page-scoped keyword lists (4 home terms; per-slug product lists). Visible copy in `site.ts` / `products.ts` reads as dealer prose, not comma-stuffed walls. Meta `keywords` still present (low SEO weight) but curated — not stuffing.

**Minor**
- Contact “WhatsApp” / “Email” buttons (`contact/index.astro` ~126–132) shorter than footer/CtaBand.

No generic “Click Here”, “No data”, or “something went wrong” chrome.

### Pillar 2: Visuals (3/4)

**Strengths (screenshots after settle)**
- Home hero: full-bleed yard photo + navy brand plane + oversized “NAVKAR / TUBES” — passes brand-first / brand-removal test (`Hero.astro`, `global.css` `.hero-split` / `.hero-plane`).
- No watermark / rail clutter on hero photo.
- About: facility photo + founder/MD portraits with roles (`about/index.astro`).
- Contact: real Vatva exterior + Rakhial office glass/logo photos (`contact/index.astro`).
- Product cards decluttered: image, optional Jindal chip, title, sizes, short blurb, “View product” (`ProductCard.astro`).
- Icon-only controls keep aria-labels (menu, FABs, back-to-top).

**Gap**
- Lancing line shares spiral photography (`images.ts` ~29) — only remaining hard visual miss for go-live.

**Navbar / motion (recent work — no blocking regression)**
- Transparent-over-dark is implemented as solid navy glass (`rgb(10 42 56 / 0.92)`) then white on scroll — readable over the split photo; intentional vs true transparency (`global.css` ~450–543).
- Utility bar collapses on `is-scrolled`; hide uses hysteresis (`delta > 10` / `delta < -8`, `y > 220`) in `MotionInit.astro` ~56–65 — no flashy jitter observed in code review.
- Mobile CTA delayed until ~55vh scroll (`MotionInit.astro` ~75–79) — first viewport stays clean.

### Pillar 3: Color (4/4)

`@theme` now defines full teal ramp including **teal-200 / teal-300** (prior blocker closed). Navy brand/dark/950, steel, surface, Jindal green for WhatsApp. Accent usage stays in the ~10% band (eyebrows, links, `.btn-teal`, focus rings). No purple/indigo SaaS drift. Hardcoded hex mostly in tokenized CSS (gradients/shadows), not random component one-offs.

### Pillar 4: Typography (4/4)

Self-hosted woffs in `public/fonts/` (~115KB latin); preloads for Source Sans 400 + Barlow 800 (`BaseLayout.astro` ~120–122). Display condensed uppercase for titles; Source Sans for UI/body. Named helpers `.text-meta` / `.text-body` / `.text-lead` / `.section-title` exist. Remaining arbitrary sizes are polish, not hierarchy failure.

### Pillar 5: Spacing (4/4)

Consistent `section-padding` + `container-narrow`. Header utility max-height collapse is smooth. Product grids `gap-8`; office/about splits `gap-12` / `lg:gap-16`. Mobile CTA height reserved via `--mobile-cta-h` when visible. Arbitrary `min-h-[260px]` etc. are layout constraints, not spacing chaos.

### Pillar 6: Experience Design (3/4)

**Strengths**
- Quote form: validity, Sending… state, 15s timeout, inline error with phone/WhatsApp, button reset (`QuoteForm.astro`).
- 404 / thank-you recovery paths intact; privacy linked from form.
- Reduced-motion CSS forces reveals/hero-enter visible (`global.css` ~1019–1047).
- Skip link, sticky PDP aside, sector query → notes prefill.

**Gaps**
- `initReveal` deferred via idle callback → temporary invisible `.reveal` content (opacity 0) on About/Products/Contact body until observer attaches — visible in instant screenshots; mitigated after ~2.5s wait. Pair with `content-visibility: auto` on homepage below-fold (`index.astro` `.cv-auto`) for perf, but above-fold interior Reveals should not wait on idle.
- Touch tablets: industry CTA hint hover-gated (optional).

---

## Files Audited

- `src/styles/global.css`
- `src/layouts/BaseLayout.astro`
- `src/components/Header.astro`, `Hero.astro`, `PageHero.astro`, `ProductCard.astro`, `ContactSection.astro`, `StatsBand.astro`, `Footer.astro`, `FloatingActions.astro`, `MotionInit.astro`, `Reviews.astro`, `JindalBand.astro`, `WhyNavkarIntro.astro`, `QuoteForm.astro`, `CtaBand.astro`
- `src/pages/index.astro`, `about/index.astro`, `contact/index.astro`, `products/index.astro`, `products/[slug].astro`, `404.astro`, `thank-you/index.astro`, `privacy/index.astro`
- `src/data/site.ts`, `products.ts`, `images.ts`, `seo.ts`
- Screenshots: `.planning/ui-reviews/01-20260722-115740/` (home desktop/mobile/tablet; about/contact/products desktop; `*-wait.png` after JS settle)

---

## Recommendation Count

- **BLOCK / must-fix:** 1 (lancing image)
- **Strongly recommended same-day:** 1 (sync reveal init)
- **Optional polish:** 2 (contact labels; industry hover CTA / type token cleanup)
