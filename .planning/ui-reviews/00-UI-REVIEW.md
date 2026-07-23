# Phase 00 — UI Review

**Audited:** 2026-07-19  
**Baseline:** Abstract 6-pillar standards (standalone site-wide audit; no UI-SPEC.md / GSD phases)  
**Screenshots:** not captured (no dev server on localhost:4321, 3000, 5173, or 8080)  
**Site:** Navkar Tubes & Tools — B2B MS pipe dealer / Authorized Jindal channel partner, Ahmedabad  
**Stack:** Astro 7 + Tailwind CSS 4

---

## Pillar Scores

| Pillar | Score | Key Finding |
|--------|-------|-------------|
| 1. Copywriting | 4/4 | Buyer-specific CTAs and B2B field labels throughout; almost no generic chrome |
| 2. Visuals | 3/4 | Strong brand-first hero and industrial photography; hero + industry tiles slightly over-dense / non-actionable |
| 3. Color | 3/4 | Clear navy/teal/surface system; `teal-300` used but missing from `@theme` tokens |
| 4. Typography | 3/4 | Correct brand fonts and hierarchy; many arbitrary size steps beyond a tight scale |
| 5. Spacing | 4/4 | Consistent `section-padding` / `container-narrow` and Tailwind spacing rhythm |
| 6. Experience Design | 3/4 | Solid thank-you/404/mobile CTA; quote form lacks failure recovery |

**Overall: 20/24**

---

## Top 3 Priority Fixes

1. **Define missing teal steps in `@theme`** — Hover/accent colors that reference `teal-200` / `teal-300` / `--color-teal-300` may resolve inconsistently or fall back — Add `--color-teal-200` and `--color-teal-300` (and wire `teal-200`/`teal-300`) to `src/styles/global.css` `@theme` alongside existing teal steps.
2. **Quote form failure recovery** — If FormSubmit fails or hangs, the button stays disabled on “Sending…” and the buyer has no path — On submit error (or timeout), re-enable the button, restore “Submit enquiry”, and show an inline fallback: call sales / WhatsApp with the same numbers already on the page.
3. **Make industry tiles actionable** — “Serving India's core sectors” shows four image tiles with no links — Wrap each tile in `/contact/?…` or `/products/` (or a short “Enquire for this sector” CTA) so the section drives quotes instead of being decorative only.

---

## Detailed Findings

### Pillar 1: Copywriting (4/4)

**Strengths**
- Hero CTAs are specific: “Get free quote”, “Browse products” (`Hero.astro` ~69–76); product CTAs include “Get quote — {title}”, “WhatsApp this product” (`products/[slug].astro` ~166–178).
- Form copy matches B2B buying: Size / OD, Quantity, Delivery city, Notes placeholders like “Standards, schedule, site timing…” (`QuoteForm.astro` ~86–103). Submit label is “Submit enquiry” (not bare “Submit”).
- 404 and thank-you pages are contextual, not generic: recovery links to Products / Catalogue / Contact (`404.astro` ~12–24); thank-you pushes sales + WhatsApp (`thank-you/index.astro` ~13–49).
- Site/product data in `site.ts` / `products.ts` uses dealer language (authorized stock, MM ranges, mill docs) rather than SaaS marketing fluff.

**Minor**
- `CtaBand.astro` secondary CTA is bare “WhatsApp” (~24) while footer/thank-you use “WhatsApp sales →” — prefer the longer label for consistency.
- Contact quick actions label “WhatsApp” / “Email” (`contact/index.astro` ~77–83) could be “WhatsApp sales” / “Email us”.

No generic “Click Here”, “OK”, “No data”, or “something went wrong” patterns found in UI strings.

### Pillar 2: Visuals (3/4)

**Strengths**
- Brand-first first viewport: oversized “Navkar / Tubes” display type dominates before the H1 (`Hero.astro` ~49–63; `.hero-brand-line1/2` in `global.css`). Passes brand-removal test better than nav-only branding.
- Full-bleed industrial hero photo with navy brand plane and clip-path split on desktop (`global.css` `.hero-split` / `.hero-plane` / `.hero-photo`).
- Clear hierarchy: display uppercase section titles, teal eyebrows, teal accent line on `SectionHeading.astro`.
- Icon-only controls have accessible names: menu (`Header.astro` ~61), FABs (`FloatingActions.astro` ~12, 22), back-to-top (`BaseLayout.astro` ~186).

**Gaps**
- Hero first viewport stacks brand + H1 + subhead + CTA group + sales phone + bottom ticker + pulse dot — denser than a strict “hero budget” (brand, one headline, one sentence, one CTA group, one image). Mobile especially feels tall before product portals.
- Industry tiles (`WhyNavkarIntro.astro` ~17–38) are visual-only; no click target or CTA despite being a major home section.
- Portal cards and product cards use lift/zoom motion intentionally (2–3+ motion systems present: hero enter, reveal, portal hover, FAB enter) — good presence, not noise.

### Pillar 3: Color (3/4)

**Token system (`global.css` `@theme`)**
- Teal `#59a1a8` family, navy `#005a7b` / `#0a2a38`, steel body, surface `#f5f7f8`, Jindal green `#166534` for WhatsApp affordance.
- Usage pattern: navy for structure/heroes, teal as ~10% accent (links, eyebrows, primary buttons via `.btn-teal`), white/surface for reading planes — healthy 60/30/10 feel.
- Hardcoded hex/rgb appear mainly in `global.css` for gradients/shadows aligned to brand (not random one-offs in components). `theme-color` meta is `#005a7b` (`BaseLayout.astro` ~101).

**Gap**
- `@theme` defines teal-50/100/400/500/600/700 but **not** teal-200 or teal-300.
- Components heavily use `text-teal-200`, `text-teal-300` (e.g. `Hero.astro` ~44, 160; `ContactSection.astro` ~20; `PageHero.astro` ~42).
- CSS references `var(--color-teal-300)` on `.hero-cta-link:hover` (`global.css` ~399–401) — token is undefined in `@theme`.

No purple/indigo SaaS palette; no cream/serif newspaper cluster. Glow limited to intentional call-pulse / hero-pulse (acceptable industrial “live line” cue, not decorative glow spam).

### Pillar 4: Typography (3/4)

**Strengths**
- Brand fonts loaded non-blocking: Barlow Condensed (600/700/800) + Source Sans 3 (400/600/700) (`BaseLayout.astro` ~112–131); `--font-display` / `--font-sans` in `@theme`.
- Clear roles: display condensed uppercase for titles; Source Sans for body/UI.
- Hero brand size via `clamp(3.6rem, 12vw, 8rem)` — expressive and on-brand.

**Against abstract “≤4 sizes / ≤2 weights”**
- Tailwind sizes in use include xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl plus arbitrary `text-[11px]`, `text-[13px]`, `text-[15px]`, `text-[1.9rem]`, `text-[2.35rem]`, `sm:text-[1.85rem]`, etc.
- Weights: medium, semibold, bold, plus 800 on hero brand lines.
- For a marketing site this is mostly coherent, but the arbitrary px/rem steps should consolidate into named tokens (e.g. `text-body`, `text-meta`, `text-display-sm`) to reduce drift.

### Pillar 5: Spacing (4/4)

**Strengths**
- Shared utilities: `.section-padding` (`px-4 py-16 sm:px-6 lg:px-8 lg:py-20`), `.container-narrow` (`max-w-7xl`) used across pages.
- Grids use consistent gap scales (`gap-8`, `gap-12`, `lg:gap-16`); product listing and reviews use border-divided columns rather than card chrome — fits industrial look.
- Mobile CTA bar height reserved via `--mobile-cta-h` + body padding (`BaseLayout.astro` ~173; `global.css` ~48).

**Notes**
- Some layout arbitrary values (`min-h-[260px]`, `max-w-[220px]`) are media/layout constraints, not spacing chaos — acceptable.
- No evidence of random `p-[13px]`-style padding sprawl.

### Pillar 6: Experience Design (3/4)

**Strengths**
- Quote form: `required` on name/phone; disables submit and shows “Sending…” (`QuoteForm.astro` ~140–147); product deep-link prefills select (`?product=`).
- Success path: FormSubmit `_next` → `/thank-you/` with phone/WhatsApp recovery.
- Error/empty routes: dedicated `404.astro` with useful exits; static catalog needs no empty-state UI.
- A11y basics: skip link, focus-visible teal outline, `prefers-reduced-motion` kill-switch, breadcrumb `aria-current`, noscript reveal fallback.
- Persistent conversion: desktop FABs + mobile call/WhatsApp bar (`FloatingActions.astro`).

**Gaps**
- No client-side handling if FormSubmit network fails — button can remain disabled with no message.
- No custom field-level error copy beyond browser HTML5 validation.
- Industry section has no interactive state (hover only).
- `_captcha` set to `false` — spam risk, not a visual defect, but affects enquiry reliability.

Registry audit: skipped (`components.json` not present; no shadcn / third-party registries).

---

## Files Audited

- `src/styles/global.css`
- `src/layouts/BaseLayout.astro`
- `src/pages/index.astro`
- `src/pages/products/index.astro`
- `src/pages/products/[slug].astro`
- `src/pages/contact/index.astro`
- `src/pages/about/index.astro`
- `src/pages/catalogue/index.astro`
- `src/pages/jindal-authorized-partner/index.astro`
- `src/pages/thank-you/index.astro`
- `src/pages/404.astro`
- `src/components/Hero.astro`
- `src/components/Header.astro`
- `src/components/Footer.astro`
- `src/components/PageHero.astro`
- `src/components/QuoteForm.astro`
- `src/components/ProductCard.astro`
- `src/components/ProductRange.astro`
- `src/components/ContactSection.astro`
- `src/components/JindalBand.astro`
- `src/components/Reviews.astro`
- `src/components/FloatingActions.astro`
- `src/components/CtaBand.astro`
- `src/components/WhyNavkarIntro.astro`
- `src/components/SectionHeading.astro`
- `src/data/site.ts`
- `src/data/products.ts`
- Supporting: `README.md`, `AGENTS.md`

---

## Minor Recommendations (not top 3)

- Align secondary WhatsApp labels to “WhatsApp sales” in `CtaBand.astro` and contact quick actions.
- Soften hero mobile density (ticker can sit below first fold on small screens).
- Product detail H2 “Key Features” → sentence case “Key features” to match other section tone.
- Re-run this audit with `astro dev` up and Playwright screenshots under `.planning/ui-reviews/` (gitignored) for visual confirmation of hero mobile stacking.
