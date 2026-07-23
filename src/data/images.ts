/**
 * Image map — optimized assets in /images/navkar/
 * Do not use warehouse.webp in UI — “About Us” is baked into that file.
 * Catalog stills (fittings/flanges/etc) are generated; export/updates remain real yard photos.
 */
export const images = {
  /** Homepage hero poster (video fallback) */
  hero: '/images/navkar/hero-poster.webp',
  heroPoster: '/images/navkar/hero-poster.webp',
  /** Compressed muted loop — use with poster */
  heroVideo: '/images/navkar/hero-loop.mp4',
  heroVideoMobile: '/images/navkar/hero-loop-720.mp4',
  heroMain: '/images/navkar/hero-main.webp',
  heroFallback: '/images/navkar/facility-signed.webp',
  /** Facility exterior with teal NAVKAR TUBES & TOOLS sign */
  warehouse: '/images/navkar/facility-signed.webp',
  facility: '/images/navkar/facility-signed.webp',
  /** Sign-focused right panel (4:5) */
  heroSignPanel: '/images/navkar/hero-sign-panel.webp',
  /** Full-bleed yard stock — prefer updates/* for authentic yard shots */
  heroYard: '/images/navkar/updates/yard-04-960.webp',
  /** Tight crop of teal NAVKAR sign — brand badge only */
  signBadge: '/images/navkar/sign-badge.webp',
  /** Real Vatva facility with Navkar signboard (not generated office renders) */
  aboutFacility: '/images/navkar/facility-signed.webp',
  officeVatva: '/images/navkar/facility-signed.webp',
  /** Real stockyard / pipe stock from yard photo set */
  officeRakhial: '/images/navkar/updates/yard-04-960.webp',
  jindalCertificate: '/images/navkar/jindal-certificate.webp',
  catalogue: '/images/navkar/brochure-cover.webp',
  catalogueLegacy: '/images/navkar/catalogue-cover.webp',
  logo: '/images/navkar/logo-full.png',
  emblem: '/images/navkar/favicon.webp',
  people: {
    founder: '/images/navkar/shripal-shah.webp',
    managingDirector: '/images/navkar/harsh-shah.webp',
  },
  products: {
    'erw-pipes': '/images/navkar/erw-pipes.webp',
    'ms-fittings': '/images/navkar/fittings.webp',
    'spiral-pipes': '/images/navkar/spiral-pipes.webp',
    'ms-flanges': '/images/navkar/flanges.webp',
    'seamless-hydraulic-pipes': '/images/navkar/hydraulic.webp',
    'ms-hollow-sections': '/images/navkar/hollow-sections.webp',
    'lancing-pipes': '/images/navkar/lancing-pipes.webp',
  },
  industries: {
    refineries: '/images/navkar/refinery.webp',
    cement: '/images/navkar/cement.webp',
    oilgas: '/images/navkar/oilgas.webp',
    chemical: '/images/navkar/chemical.webp',
  },
  /** Real export container loading photos (from yard WhatsApp set) */
  export: {
    hero: '/images/navkar/export/export-12.webp',
    loading: '/images/navkar/export/export-10.webp',
    packing: '/images/navkar/export/export-09.webp',
    yard: '/images/navkar/export/export-09.webp',
    bundles: '/images/navkar/export/export-10.webp',
    outbound: '/images/navkar/export/export-19.webp',
  },
  /** Real yard photos for updates & homepage strips */
  updates: {
    erwStock: '/images/navkar/updates/yard-01-960.webp',
    erwBundles: '/images/navkar/updates/yard-04-960.webp',
    spiralStock: '/images/navkar/updates/yard-08-960.webp',
    hollowStock: '/images/navkar/updates/yard-10-960.webp',
    dispatch: '/images/navkar/updates/yard-16-960.webp',
    yardWide: '/images/navkar/updates/yard-22-960.webp',
  },
} as const;

/** Responsive srcset — hero poster family */
export const heroSrcset = '/images/navkar/hero-poster.webp 1920w';

export const heroSizes = '100vw';

export function productImage(slug: string): string {
  return images.products[slug as keyof typeof images.products] ?? images.hero;
}
