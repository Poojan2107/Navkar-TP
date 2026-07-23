/**
 * Curated SEO — page keywords and meta descriptions.
 * Dealer / supplier language for Jindal & Asian stock lines.
 */
export const seoKeywords = {
  home: [
    'MS Pipes Dealer in Ahmedabad',
    'ERW Pipes Supplier in Gujarat',
    'Jindal Pipes Dealer Ahmedabad',
    'GI Pipe Dealers in Ahmedabad',
    'MS Pipe Stockist Ahmedabad',
    'Asian Pipes Dealer Gujarat',
  ],
  products: [
    'MS Pipes Products Ahmedabad',
    'Jindal ERW Pipes Gujarat',
    'Pipe Fittings Dealer Ahmedabad',
  ],
  updates: [
    'MS Pipes Stock Ahmedabad',
    'ERW Pipes Yard Gujarat',
    'Jindal Pipe Stock Update',
    'Pipe Dealer Ahmedabad Gujarat',
  ],
  contact: [
    'MS Pipes Quote Ahmedabad',
    'Jindal Pipes Enquiry Gujarat',
    'Pipe Dealer Contact Ahmedabad',
  ],
  about: [
    'Navkar Tubes About',
    'MS Pipe Stockist Ahmedabad Since 1995',
    'Jindal Authorized Partner Gujarat',
  ],
  jindal: [
    'Jindal Authorized Dealer Ahmedabad',
    'Jindal ERW Pipes Gujarat',
    'Jindal GI Hollow Sections Dealer',
  ],
  catalogue: ['Navkar Tubes Catalogue', 'MS Pipes Brochure PDF', 'Jindal Pipes Catalogue'],
  productsBySlug: {
    'erw-pipes': [
      'ERW Pipes',
      'ERW Pipes Dealer in Ahmedabad',
      'ERW Pipes Supplier in Gujarat',
      'MS ERW Black Pipes',
    ],
    'ms-hollow-sections': [
      'MS Square Pipes',
      'GI Pipe Dealers in Ahmedabad',
      'Galvanized Iron Pipes Supplier',
      'Asian Pipes Supplier in Ahmedabad',
    ],
    'seamless-hydraulic-pipes': [
      'Seamless Pipes in Ahmedabad',
      'Seamless Pipes Supplier in Gujarat',
      'MS Seamless Pipes',
    ],
    'lancing-pipes': [
      'Lancing Pipes Ahmedabad',
      'Ceramic Coated Lancing Pipe',
      'Special Coated Lancing Pipe Gujarat',
    ],
    'ms-fittings': ['MS Fittings', 'MS Pipe Fittings Ahmedabad'],
    'spiral-pipes': ['Spiral Pipes', 'Spiral Pipes Supplier Gujarat'],
    'ms-flanges': ['MS Flanges', 'MS Flanges Ahmedabad'],
  },
} as const;

export const seoDescriptions: Record<string, string> = {
  home: 'Jindal authorized MS pipes dealer in Ahmedabad, Gujarat — ERW black pipes, GI hollow sections, Asian pipes stock, fittings & flanges. Free quote. Call +91 9601702883.',
  products:
    'Browse Jindal ERW pipes, GI hollow sections, spiral pipes, MS fittings, flanges, hydraulic pipes & lancing pipes — stocked in Ahmedabad, Gujarat. Request a free quote.',
  contact:
    'Contact Navkar Tubes for MS pipes quote in Ahmedabad, Gujarat. Sales +91 9601702883 · WhatsApp · Free quotation for ERW, GI & project supply.',
  about:
    'Navkar Tubes & Tools — MS pipe stockist in Ahmedabad, Gujarat since 1995. Jindal authorized channel partner. Founder Shripal Shah & MD Harsh Kothari.',
  jindal:
    'Authorized Jindal channel partner in Ahmedabad — genuine MS ERW black pipes & GI square/rectangular hollow sections, 15–500 MM. Certificate on file. Navkar Tubes & Tools.',
  updates:
    'Live yard stock updates from Navkar Tubes — ERW pipes, spiral pipes, hollow sections & dispatch photos from Ahmedabad, Gujarat.',
  catalogue: 'Download Navkar Tubes product catalogue — MS pipes, ERW, fittings, flanges and Jindal authorized lines from Ahmedabad, Gujarat.',
};

/** Comma-separated meta keywords for a page */
export function metaKeywordsFor(slug?: string): string {
  if (slug && slug in seoKeywords.productsBySlug) {
    return [...seoKeywords.productsBySlug[slug as keyof typeof seoKeywords.productsBySlug]].join(', ');
  }
  if (slug && slug in seoKeywords && slug !== 'productsBySlug') {
    const key = slug as Exclude<keyof typeof seoKeywords, 'productsBySlug'>;
    return [...seoKeywords[key]].join(', ');
  }
  return seoKeywords.home.join(', ');
}

export function metaDescriptionFor(slug?: string, fallback?: string): string {
  if (slug && slug in seoDescriptions) return seoDescriptions[slug];
  return fallback ?? seoDescriptions.home;
}
