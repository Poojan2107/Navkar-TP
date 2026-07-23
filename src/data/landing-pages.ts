export interface LandingSection {
  heading: string;
  paragraphs: string[];
}

export interface LandingPageData {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywordsSlug: string;
  eyebrow: string;
  heroTitle: string;
  heroDescription: string;
  sections: LandingSection[];
  productLinks: { label: string; href: string }[];
}

export const landingPages: LandingPageData[] = [
  {
    slug: 'ms-pipes-dealer-ahmedabad',
    title: 'MS Pipes Dealer Ahmedabad',
    metaTitle: 'MS Pipes Dealer in Ahmedabad | Navkar Tubes',
    metaDescription:
      'MS pipes dealer in Ahmedabad — Jindal ERW, GI hollow sections, spiral pipes, fittings & flanges from Ahmedabad, Gujarat. Free quote. Call +91 9601702883.',
    keywordsSlug: 'home',
    eyebrow: 'Ahmedabad · Gujarat',
    heroTitle: 'MS pipes dealer in Ahmedabad',
    heroDescription:
      'Authorized Jindal channel partner based in Ahmedabad, Gujarat — 15 MM to 500 MM pipe range.',
    sections: [
      {
        heading: 'Your MS pipe stockist in Ahmedabad, Gujarat',
        paragraphs: [
          '<strong class="font-semibold text-navy-brand">Navkar Tubes & Tools</strong> is a leading MS pipes dealer in Ahmedabad, supplying ERW black pipes, GI square & rectangular hollow sections, spiral pipes, MS fittings and flanges to contractors, fabricators and industrial buyers across Gujarat and India.',
          'We hold stock in <strong class="font-semibold text-navy-brand">Ahmedabad, Gujarat</strong> for faster dispatch on project schedules. Request a detailed free quotation with NB, wall thickness, grade and delivery location.',
        ],
      },
      {
        heading: 'Why buyers choose Navkar',
        paragraphs: [
          'Authorized <a href="/jindal-authorized-partner/" class="font-semibold text-teal-600">Jindal channel partner</a> for genuine MS ERW and GI hollow sections. Also stocking Asian, MSL, JSL and allied mill lines on enquiry.',
          'See live <a href="/updates/" class="font-semibold text-teal-600">yard stock updates</a> with photos from our Ahmedabad facilities — updated regularly for transparency.',
        ],
      },
    ],
    productLinks: [
      { label: 'ERW Pipes', href: '/products/erw-pipes/' },
      { label: 'Hollow Sections', href: '/products/ms-hollow-sections/' },
      { label: 'Spiral Pipes', href: '/products/spiral-pipes/' },
      { label: 'MS Fittings', href: '/products/ms-fittings/' },
      { label: 'Get quote', href: '/contact/' },
    ],
  },
  {
    slug: 'erw-pipes-supplier-gujarat',
    title: 'ERW Pipes Supplier Gujarat',
    metaTitle: 'ERW Pipes Supplier in Gujarat | Jindal ERW Ahmedabad',
    metaDescription:
      'ERW pipes supplier in Gujarat — genuine Jindal MS ERW black pipes 15–500 MM from Navkar Tubes, Ahmedabad. Project dispatch across Gujarat & India.',
    keywordsSlug: 'products',
    eyebrow: 'Gujarat supply',
    heroTitle: 'ERW pipes supplier in Gujarat',
    heroDescription: 'Jindal authorized MS ERW black pipes — stocked in Ahmedabad, supplied statewide.',
    sections: [
      {
        heading: 'Jindal MS ERW from Ahmedabad stock',
        paragraphs: [
          'Navkar Tubes is an <strong class="font-semibold text-navy-brand">ERW pipes supplier in Gujarat</strong>, specializing in genuine Jindal MS ERW black pipes for structural, fabrication and industrial applications from 15 MM to 500 MM.',
          'Orders are confirmed against Ahmedabad, Gujarat yard stock with mill documentation available on request. We dispatch across Ahmedabad, Surat, Vadodara, Rajkot and nationwide project sites.',
        ],
      },
      {
        heading: 'Sizes, grades & quotation',
        paragraphs: [
          'Share your bill of materials — NB, schedule, length and quantity — for same-day availability check. Complementary <a href="/products/ms-fittings/" class="font-semibold text-teal-600">MS fittings</a> and <a href="/products/ms-flanges/" class="font-semibold text-teal-600">flanges</a> can be quoted in one enquiry.',
        ],
      },
    ],
    productLinks: [
      { label: 'ERW Pipes', href: '/products/erw-pipes/' },
      { label: 'Jindal Partner', href: '/jindal-authorized-partner/' },
      { label: 'Yard updates', href: '/updates/' },
      { label: 'Contact sales', href: '/contact/' },
    ],
  },
  {
    slug: 'gi-pipes-dealer-ahmedabad',
    title: 'GI Pipes Dealer Ahmedabad',
    metaTitle: 'GI Pipe Dealers in Ahmedabad | Jindal Hollow Sections',
    metaDescription:
      'GI pipe dealers in Ahmedabad — Jindal GI square & rectangular hollow sections, Asian pipes stock. Navkar Tubes, Ahmedabad, Gujarat. Free quote.',
    keywordsSlug: 'products',
    eyebrow: 'GI & hollow sections',
    heroTitle: 'GI pipes dealer in Ahmedabad',
    heroDescription: 'Jindal GI square & rectangular hollow sections — authorized partner stock.',
    sections: [
      {
        heading: 'GI hollow sections & galvanized pipe stock',
        paragraphs: [
          'Looking for <strong class="font-semibold text-navy-brand">GI pipe dealers in Ahmedabad</strong>? Navkar Tubes stocks Jindal GI square and rectangular hollow sections (RHS/SHS) plus Asian and allied GI/MS lines for fabrication and roofing projects.',
          'As authorized Jindal partner we supply genuine hollow section material with sizes confirmed against your matrix — side × side × thickness × length.',
        ],
      },
      {
        heading: 'Asian pipes & project supply',
        paragraphs: [
          'Alongside Jindal GI range we maintain <strong class="font-semibold text-navy-brand">Asian pipes stock</strong> for buyers who specify mill-specific lines. One enquiry covers pipes, fittings and flanges from our Ahmedabad yards.',
        ],
      },
    ],
    productLinks: [
      { label: 'Hollow Sections', href: '/products/ms-hollow-sections/' },
      { label: 'ERW Pipes', href: '/products/erw-pipes/' },
      { label: 'Products', href: '/products/' },
      { label: 'Get quote', href: '/contact/' },
    ],
  },
];

export function getLandingPage(slug: string) {
  return landingPages.find((p) => p.slug === slug);
}
