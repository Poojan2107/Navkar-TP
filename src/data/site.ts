import { images } from './images';

export const site = {
  name: 'Navkar Tubes & Tools',
  shortName: 'Navkar Tubes',
  tagline: 'Jindal Authorized Channel Partner · Ahmedabad',
  description:
    'Authorized Jindal channel partner and MS pipes dealer in Ahmedabad, Gujarat — ERW black pipes, GI hollow sections, Asian pipes stock, ceramic coated lancing pipes, fittings and flanges.',
  url: 'https://navkartube.com',
  email: 'navkartube@gmail.com',
  phones: {
    primary: '+91 8780422006',
    sales: '+91 9601702883',
    primaryTel: 'tel:+918780422006',
    salesTel: 'tel:+919601702883',
    whatsapp: 'https://wa.me/919601702883',
    /** Secondary yard line from live contact page */
    rakhial: '+91 9825085947',
    rakhialTel: 'tel:+919825085947',
  },
  address: {
    line1: 'Plot No. 1426/B, Trikampura Patiya',
    line2: 'Phase-3, GIDC',
    city: 'Ahmedabad',
    state: 'Gujarat',
    country: 'India',
    full: 'Plot No. 1426/B, Trikampura Patiya, Phase-3, GIDC, Ahmedabad, Gujarat',
  },
  /** Secondary line — kept for phone routing; labels use Ahmedabad only in UI */
  rakhial: {
    line1: '8, Jaymangal Estate, Opp. Jagganath Estate',
    line2: 'Nr. Gujarat Bottling',
    city: 'Ahmedabad',
    state: 'Gujarat',
    full: '8, Jaymangal Estate, Opp. Jagganath Estate, Nr. Gujarat Bottling, Ahmedabad, Gujarat',
  },
  locations: ['Ahmedabad', 'Gujarat'],
  catalogueUrl: '/catalogue/',
  /**
   * Google Business Profile sticky search links (Knowledge Panel).
   * Primary = Jindal / Asian pipes dealer listing used for reviews CTA.
   */
  googleReviewsUrl:
    'https://www.google.com/search?q=Navkar+Tubes+%26+Tools+-+JINDAL+PIPES+%26+ASIAN+PIPES+DEALER+IN+AHMEDABAD+%7C+GUJARAT&stick=H4sIAAAAAAAA_-NgU1I1qDC2NE21ME9NSbZIMUw1TkqyMqhIMbdMNklKBIqZGSSbJCcvYvX3SyzLTixSCClNSi1WUFMIyc_PKVbQVfDy9HNx9FEI8AxwDQYKOwZ7OvpBeS6ujj6uQQqefgqOHr6uLo5Oji4KNQruoV6OQY4hAAyHKvF7AAAA&hl=en-GB',
  googleProfiles: [
    'https://www.google.com/search?q=Navkar+Tubes+%26+Tools+-+JINDAL+PIPES+%26+ASIAN+PIPES+DEALER+IN+AHMEDABAD+%7C+GUJARAT&stick=H4sIAAAAAAAA_-NgU1I1qDC2NE21ME9NSbZIMUw1TkqyMqhIMbdMNklKBIqZGSSbJCcvYvX3SyzLTixSCClNSi1WUFMIyc_PKVbQVfDy9HNx9FEI8AxwDQYKOwZ7OvpBeS6ujj6uQQqefgqOHr6uLo5Oji4KNQruoV6OQY4hAAyHKvF7AAAA&hl=en-GB',
    'https://www.google.com/search?q=NAVKAR+TUBES+%26+TOOLS+-+CERAMIC+%26+SPECIAL+COATED+LANCING+PIPE+MANUFACTURER+AHMEDABAD+%7C+GUJARAT&stick=H4sIAAAAAAAA_w3IMQ6CMBQG4EnjMV5MdCNpqC3F7ac8sQqFlNbNheodGDyNJ9Vv_Hbb_UGsslZvo7XKudSmXtRZrFoqk6uXllIsZXUy383T43FHoJganulIcRz7mQqyHDA4-595YuvQkx0RuaUe3jrf0eQmpgE-XWBjChwI14FbNGjpQ126ISD-AE_d_wmJAAAA&hl=en-GB',
  ],
} as const;

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products/', label: 'Products' },
  { href: '/updates/', label: 'Updates' },
  { href: '/jindal-authorized-partner/', label: 'Jindal' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
] as const;

/** Hero copy — homepage split hero */
export const hero = {
  brand: 'Navkar Tubes',
  headline: 'Stronger Pipes. Stronger Solutions.',
  subheadline:
    'Premium quality tubes, pipes & tools from leading brands. Trusted by professionals. Delivered with reliability.',
  visualImage: images.products['ms-hollow-sections'],
} as const;

/** Stocked brands — Jindal is authorized; Asian is dealer/stockist */
export const brandLines = [
  {
    name: 'Jindal',
    role: 'Authorized channel partner',
    detail: 'MS ERW black pipes and GI square & rectangular pipes — 15 MM to 500 MM.',
    href: '/jindal-authorized-partner/',
  },
  {
    name: 'Also stocked',
    role: 'Dealer / stockist brands',
    detail: 'Asian, MSL, JSL, Suryaprakash, Apollo and related mill lines — confirm size and grade with sales.',
    href: '/products/',
  },
] as const;

/** Core product portals — ERW featured as primary line */
export const weServe = [
  {
    title: 'ERW Pipes',
    slug: 'erw-pipes',
    image: images.products['erw-pipes'],
    description: 'Genuine Jindal MS ERW black pipes — 15 MM to 500 MM for structural and industrial projects.',
    featured: true,
  },
  {
    title: 'MS Fittings',
    slug: 'ms-fittings',
    image: images.products['ms-fittings'],
    description: 'Mild steel fittings matched to ERW and MS pipe systems for process and fabrication work.',
    featured: false,
  },
  {
    title: 'Spiral Pipes',
    slug: 'spiral-pipes',
    image: images.products['spiral-pipes'],
    description: 'Large diameter spiral welded pipes for transmission and heavy engineering.',
    featured: false,
  },
] as const;

export const trustPoints = [
  'Authorized Jindal channel partner',
  '15 MM to 500 MM pipe range',
  'Ahmedabad, Gujarat stockyards',
  'Detailed, quick & free quote',
  'Widest stock of large diameter pipe',
  'Government & private sector supplier',
  'MS fittings & flanges in stock',
  'Nationwide project dispatch',
] as const;

/** Industries from current homepage */
export const featuredIndustries = [
  { name: 'Refineries', slug: 'refineries', image: images.industries.refineries },
  { name: 'Cement Industry', slug: 'cement', image: images.industries.cement },
  { name: 'Oil & Gas Industry', slug: 'oil-gas', image: images.industries.oilgas },
  { name: 'Chemical Industry', slug: 'chemical', image: images.industries.chemical },
] as const;

/** Value props — homepage “Why choose us” grid */
export const valueCards = [
  {
    title: 'Stock & speed',
    bullets: [
      'Large diameter pipe ready for urgent lifts',
      'Detailed free quote — product, size, quantity',
      'Competitive pricing for project volumes',
    ],
  },
  {
    title: 'Authorized supply',
    description:
      'Genuine Jindal MS ERW and GI hollow sections, plus fittings and flanges — stocked in Ahmedabad, Gujarat and dispatched nationwide.',
  },
  {
    title: '15–500 MM range',
    description:
      'Full ERW black pipe and GI hollow section sizes in stock — share your bill of materials and we confirm availability same day.',
  },
  {
    title: 'Nationwide dispatch',
    description:
      'Ahmedabad, Gujarat yards with lift-ready stock for Gujarat projects and freight dispatch across India.',
  },
] as const;

/** Complementary product blurbs below portals */
export const productRange = [
  {
    title: 'MS Flanges',
    slug: 'ms-flanges',
    image: images.products['ms-flanges'],
    imageLeft: true,
    sizes: 'Blind, slip-on & weld-neck',
    text: 'Mild steel flanges for welding or bolted joints — closure and connection stock for industrial piping.',
  },
  {
    title: 'Seamless Hydraulic Pipes',
    slug: 'seamless-hydraulic-pipes',
    image: images.products['seamless-hydraulic-pipes'],
    imageLeft: false,
    sizes: 'ANSI · API · IS · DIN',
    text: 'Seamless hydraulic pipe to project standards. Ask for grade, schedule and length with your enquiry.',
  },
  {
    title: 'MS Square & Rectangular Hollow Sections',
    slug: 'ms-hollow-sections',
    image: images.products['ms-hollow-sections'],
    imageLeft: true,
    sizes: 'GI / MS RHS & SHS',
    text: 'Square and rectangular hollow sections including authorized Jindal GI range — mill finish or anti-rust coating.',
  },
] as const;

export const proofBand = [
  { value: 'Est. 1995', label: 'Ahmedabad stockist' },
  { value: 'Ahmedabad', label: 'Gujarat stockyards' },
  { value: 'Jindal + Asian', label: 'Brands in stock' },
  { value: 'Govt & Pvt', label: 'Sector supply' },
] as const;

export const stats = [
  { value: '15–500 MM', label: 'Pipe range' },
  { value: 'Nationwide', label: 'Supply network' },
  { value: 'Jindal', label: 'Authorized partner' },
  { value: 'Quick reply', label: 'Sales support' },
] as const;

export const aboutIntro =
  'Navkar Tubes & Tools was established in 1995 in Ahmedabad. We are a leading stockist of MS seamless pipe, MS ERW pipe, MS square & rectangular pipe, fittings, oxygen lancing pipe and related sections — and an Authorized Channel Partner of Jindal (India) Limited.';

export const aboutBody =
  'From Ahmedabad, Gujarat we supply government, public and private sector jobs — cement, chemical, oil & gas, sugar, fertilizer and heavy engineering — with fast quotes and reliable dispatch across Gujarat and India.';

export const aboutHighlights =
  'We customize sizes to project requirements. Stocked and supplied brands include Jindal, MSL, JSL, Asian, Suryaprakash, Apollo and related mill lines.';

export const aboutMission =
  'High-quality products, reasonable prices and dependable service. Trust is our motto.';

export const team = [
  {
    role: 'Founder',
    name: 'Shripal Shah',
    phone: '+91 9825085947',
    tel: 'tel:+919825085947',
    image: images.people.founder,
  },
  {
    role: 'Managing Director',
    name: 'Harsh Shah',
    phone: '+91 9601702883',
    tel: 'tel:+919601702883',
    image: images.people.managingDirector,
  },
] as const;

/** Jindal partnership — present-tense proof; ask sales for current certificate period */
export const jindalPartner = {
  title: 'Authorized Channel Partner of Jindal (India) Limited',
  body: 'Navkar Tubes & Tools, Ahmedabad, is an Authorized Channel Partner of Jindal (India) Limited for MS ERW black pipes and GI square & rectangular pipes.',
  detail:
    'Authorization covers retail and stock across 15 MM to 500 MM. Ask for mill / invoice documentation and current authorization with your order — we supply genuine Jindal material from Ahmedabad, Gujarat.',
  /** Last certificate period on file — confirm current status with sales */
  validFrom: '01/04/2025',
  validTo: '31/03/2026',
  validityLabel: 'Certificate on file — confirm current period with sales',
  products: ['MS ERW Black Pipes', 'GI Square Pipes', 'GI Rectangular Pipes'],
  sizeRange: '15 MM to 500 MM',
  certificateImage: images.jindalCertificate,
} as const;
