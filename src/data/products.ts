import { images, productImage } from './images';

export interface SpecRow {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  features: string[];
  applications: string[];
  standards?: string[];
  materials?: string[];
  sizes?: string;
  /** Buyer-facing size / grade rows for PDP tables */
  specs?: SpecRow[];
  gradient: string;
  /** Authorized Jindal line — shown as primary group on listing */
  jindalAuthorized?: boolean;
}

export const products: Product[] = [
  {
    slug: 'erw-pipes',
    title: 'ERW Pipes',
    shortDescription: 'Jindal MS ERW black pipes — 15 MM to 500 MM, ready stock in Ahmedabad.',
    image: productImage('erw-pipes'),
    description:
      'Genuine Jindal MS ERW (Electric Resistance Welded) black pipes through our authorized channel partnership. Stocked 15 MM to 500 MM for construction, fabrication and industrial projects across Gujarat and India.',
    features: [
      'Authorized Jindal MS ERW black pipes',
      'Diameter range 15 MM to 500 MM',
      'Consistent wall thickness and finish',
      'Ready stock for urgent project lifts',
    ],
    applications: [
      'Structural fabrication',
      'Construction and infrastructure',
      'Industrial piping frameworks',
      'General engineering',
    ],
    standards: ['IS 1239 / IS 3589', 'Confirm grade with sales'],
    sizes: '15 MM to 500 MM',
    specs: [
      { label: 'OD range', value: '15 MM – 500 MM' },
      { label: 'Common sizes', value: '15, 20, 25, 32, 40, 50, 65, 80, 100, 150, 200, 250, 300, 400, 500 MM' },
      { label: 'Finish', value: 'MS ERW black' },
      { label: 'Supply', value: 'Ready stock · confirm wall & length' },
    ],
    gradient: 'from-teal-500 to-navy-brand',
    jindalAuthorized: true,
  },
  {
    slug: 'ms-hollow-sections',
    title: 'MS Square & Rectangular Hollow Sections',
    shortDescription: 'GI / MS RHS & SHS — Jindal GI sections plus Asian pipes stock.',
    image: productImage('ms-hollow-sections'),
    description:
      'Square and rectangular hollow sections (SHS / RHS) for structural and fabrication work. Includes authorized Jindal GI square and rectangular pipes, MS sections, and Asian pipes stockist lines in common sizes. Available mill finish or with anti-rust coating — confirm thickness and length with your enquiry.',
    features: [
      'Authorized Jindal GI square & rectangular pipes',
      'Asian pipes dealer stock (confirm size & grade)',
      'MS hollow sections for fabrication',
      'Mill finish or anti-rust coating',
    ],
    applications: [
      'Structural steel fabrication',
      'Construction frames and supports',
      'Industrial frameworks',
      'Plant and site structures',
    ],
    sizes: 'Common SHS / RHS sizes · confirm OD & thickness',
    specs: [
      { label: 'Profiles', value: 'SHS (square) · RHS (rectangular)' },
      { label: 'Authorized', value: 'Jindal GI square & rectangular' },
      { label: 'Finish', value: 'Mill finish or anti-rust coating' },
      { label: 'Supply', value: 'Confirm size, thickness & length' },
    ],
    gradient: 'from-navy-brand to-navy-dark',
    jindalAuthorized: true,
  },
  {
    slug: 'ms-fittings',
    title: 'MS Fittings',
    shortDescription: 'Elbows, tees, reducers and couplings matched to MS / ERW lines.',
    image: productImage('ms-fittings'),
    description:
      'Mild steel pipe fittings stocked alongside our ERW and MS pipe range — elbows, tees, reducers, couplings and related pieces for process piping and fabrication. Quote with pipe size and schedule for matched supply.',
    features: [
      'Matched to MS and ERW pipe systems',
      'Elbows, tees, reducers and couplings',
      'Checked before dispatch',
      'Bulk supply for project packages',
    ],
    applications: [
      'Process piping',
      'Plant maintenance',
      'Fabrication workshops',
      'Utility lines',
    ],
    sizes: '½″ to large bore · standard MS ranges',
    specs: [
      { label: 'Types', value: 'Elbows, tees, reducers, couplings' },
      { label: 'Size range', value: '½″ to large bore (standard MS)' },
      { label: 'Match', value: 'MS / ERW pipe systems' },
      { label: 'Supply', value: 'Quote with pipe size & schedule' },
    ],
    gradient: 'from-navy-brand to-steel-500',
  },
  {
    slug: 'spiral-pipes',
    title: 'Spiral Pipes',
    shortDescription: 'Large-diameter spiral welded pipes for transmission and heavy duty.',
    image: productImage('spiral-pipes'),
    description:
      'Spiral welded pipes for large diameter, high-volume applications. Suited to water transmission, infrastructure and heavy engineering — share OD, thickness and length for a project quote.',
    features: [
      'Large diameter capability',
      'Suited to high-volume flow lines',
      'Government and private project supply',
      'Competitive project pricing',
    ],
    applications: [
      'Water transmission',
      'Heavy engineering',
      'Infrastructure projects',
      'Industrial process lines',
    ],
    sizes: 'Large OD · confirm wall & length',
    specs: [
      { label: 'Type', value: 'Spiral welded' },
      { label: 'OD', value: 'Large diameter — confirm with enquiry' },
      { label: 'Use', value: 'Transmission & heavy engineering' },
      { label: 'Supply', value: 'Project quote on OD / wall / length' },
    ],
    gradient: 'from-navy-brand to-navy-dark',
  },
  {
    slug: 'ms-flanges',
    title: 'MS Flanges',
    shortDescription: 'Blind, slip-on and weld-neck flanges for MS / ERW joints.',
    image: productImage('ms-flanges'),
    description:
      'Mild steel flanges for bolted or welded pipe connections — blind, slip-on and weld-neck types commonly used with MS and ERW systems. Stock supports shutdowns, plant maintenance and new fabrication. Share size, rating and facing with your enquiry.',
    features: [
      'Blind, slip-on and weld-neck options',
      'MS blind flanges for pipe closure',
      'Balanced strength for industrial service',
      'Matched supply with pipe packages',
    ],
    applications: [
      'Pipe termination and closure',
      'Process equipment connections',
      'Maintenance and shutdowns',
      'Industrial piping networks',
    ],
    sizes: 'Common NB sizes · rating on request',
    specs: [
      { label: 'Types', value: 'Blind · slip-on · weld-neck' },
      { label: 'Size', value: 'Common NB sizes' },
      { label: 'Rating / facing', value: 'Confirm with enquiry' },
      { label: 'Supply', value: 'Matched with MS / ERW packages' },
    ],
    gradient: 'from-steel-500 to-navy-dark',
  },
  {
    slug: 'seamless-hydraulic-pipes',
    title: 'Seamless Hydraulic Pipes',
    shortDescription: 'Seamless hydraulic pipe quoted to ANSI, API, IS and related standards.',
    image: productImage('seamless-hydraulic-pipes'),
    description:
      'Seamless hydraulic pipes supplied to project specification from Ahmedabad. Quoted against ANSI, API, MSS, BS, DIN, JIS and IS. Tell us OD, wall, grade and quantity — we quote from stock or mill lead time.',
    features: [
      'Quoted to your size and grade',
      'ANSI, API, MSS, BS, DIN, JIS & IS',
      'Seamless construction for pressure lines',
      'Carbon steel grades as specified',
    ],
    applications: [
      'Hydraulic systems',
      'High-pressure fluid lines',
      'Precision engineering equipment',
      'Industrial machinery',
    ],
    standards: ['ANSI', 'API', 'MSS', 'BS', 'DIN', 'JIS', 'IS'],
    materials: ['ASTM A106', 'ASTM A181', 'ASTM A182', 'Forged carbon steel as required'],
    sizes: 'Confirm OD, wall & grade',
    specs: [
      { label: 'Construction', value: 'Seamless' },
      { label: 'Standards', value: 'ANSI · API · MSS · BS · DIN · JIS · IS' },
      { label: 'Materials', value: 'A106 / A181 / A182 as required' },
      { label: 'Supply', value: 'Quote on OD, wall, grade & qty' },
    ],
    gradient: 'from-teal-600 to-navy-dark',
  },
  {
    slug: 'lancing-pipes',
    title: 'Ceramic & Special Coated Lancing Pipes',
    shortDescription: 'Ceramic and special coated lancing pipes made in Ahmedabad for steel plant duty.',
    image: productImage('lancing-pipes'),
    description:
      'Ceramic coated and special coated lancing pipes for steel plants and high-temperature process work. Manufactured and supplied from Ahmedabad — share diameter, coating type, length and quantity for a production quote.',
    features: [
      'Ceramic coated lancing pipes',
      'Special coated options for process duty',
      'Sized for steel plant / furnace applications',
      'Quote on OD, coating, length and quantity',
    ],
    applications: [
      'Steel plants and furnaces',
      'Oxygen / process lancing',
      'High-temperature industrial use',
      'Foundry and metallurgy',
    ],
    sizes: 'Confirm OD, coating & length',
    specs: [
      { label: 'Type', value: 'Ceramic coated · special coated lancing' },
      { label: 'Use', value: 'Steel plant / furnace process' },
      { label: 'Supply', value: 'Manufactured · Ahmedabad' },
      { label: 'Enquiry', value: 'OD, coating, length & quantity' },
    ],
    gradient: 'from-navy-dark to-steel-500',
  },
  {
    slug: 'asian-pipes',
    title: 'Asian Pipes Stock',
    shortDescription: 'Asian mill lines for hollow sections and MS pipes — confirm size and grade with sales.',
    image: productImage('asian-pipes'),
    description:
      'Asian pipes dealer stock alongside our Jindal authorized range. Common hollow sections and MS pipe sizes for fabrication and structural work — share OD, thickness, length and quantity for availability from Ahmedabad.',
    features: [
      'Asian mill stockist lines',
      'Hollow sections and MS pipe sizes',
      'Paired with fittings and flanges on request',
      'Confirm size and grade before dispatch',
    ],
    applications: [
      'Structural fabrication',
      'Construction frames',
      'Plant maintenance',
      'General engineering',
    ],
    sizes: 'Common sizes · confirm OD & thickness',
    specs: [
      { label: 'Brand', value: 'Asian (dealer / stockist)' },
      { label: 'Lines', value: 'Hollow sections · MS pipes' },
      { label: 'Supply', value: 'Ahmedabad yard · confirm grade' },
      { label: 'Enquiry', value: 'OD, thickness, length & qty' },
    ],
    gradient: 'from-steel-500 to-navy-brand',
  },
  {
    slug: 'allied-mill-stock',
    title: 'Allied Mill Stock',
    shortDescription: 'MSL, JSL, Suryaprakash, Apollo and related mills — quote size and grade from Ahmedabad.',
    image: productImage('allied-mill-stock'),
    description:
      'Allied mill stock beyond Jindal and Asian — including MSL, JSL, Suryaprakash, Apollo and related lines as available. Ideal when a project specifies an alternate mill. Tell us brand preference, size and quantity for a free quote from Ahmedabad.',
    features: [
      'MSL, JSL, Suryaprakash, Apollo and related',
      'Quoted against project mill preference',
      'Cross-checked before confirming dispatch',
      'Bundled with fittings and flanges on request',
    ],
    applications: [
      'Project mill substitutions',
      'Government and private tenders',
      'Fabrication workshops',
      'Infrastructure packages',
    ],
    sizes: 'Confirm mill, size & grade',
    specs: [
      { label: 'Mills', value: 'MSL · JSL · Suryaprakash · Apollo · related' },
      { label: 'Supply', value: 'Stock or mill lead time' },
      { label: 'Docs', value: 'Mill docs on request' },
      { label: 'Enquiry', value: 'Brand, size, grade & qty' },
    ],
    gradient: 'from-navy-brand to-teal-600',
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getJindalProducts(): Product[] {
  return products.filter((p) => p.jindalAuthorized);
}

export function getComplementaryProducts(): Product[] {
  return products.filter((p) => !p.jindalAuthorized);
}

export { images };
