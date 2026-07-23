import fs from 'fs';
import path from 'path';

const dir = path.join('public', 'images', 'placeholders');
fs.mkdirSync(dir, { recursive: true });

const brand = {
  teal: '#59a1a8',
  tealDark: '#3d7a80',
  navy: '#005a7b',
  navyDark: '#0a2a38',
  white: '#ffffff',
  muted: '#d4ecef',
};

function svgPlaceholder({ title, subtitle = 'Navkar Tubes & Tools', w = 1200, h = 900, accent = brand.teal }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${title}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${brand.navyDark}"/>
      <stop offset="55%" stop-color="${brand.navy}"/>
      <stop offset="100%" stop-color="${accent}"/>
    </linearGradient>
    <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
      <path d="M32 0H0V32" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect width="${w}" height="${h}" fill="url(#grid)"/>
  <!-- pipe silhouettes -->
  <g opacity="0.18" fill="none" stroke="${brand.white}" stroke-width="18">
    <ellipse cx="${w * 0.22}" cy="${h * 0.55}" rx="70" ry="70"/>
    <ellipse cx="${w * 0.22}" cy="${h * 0.55}" rx="28" ry="28"/>
    <ellipse cx="${w * 0.48}" cy="${h * 0.62}" rx="90" ry="90"/>
    <ellipse cx="${w * 0.48}" cy="${h * 0.62}" rx="36" ry="36"/>
    <ellipse cx="${w * 0.78}" cy="${h * 0.5}" rx="60" ry="60"/>
    <ellipse cx="${w * 0.78}" cy="${h * 0.5}" rx="24" ry="24"/>
  </g>
  <rect x="48" y="48" width="160" height="36" rx="8" fill="rgba(255,255,255,0.12)"/>
  <text x="64" y="72" fill="${brand.muted}" font-family="system-ui,sans-serif" font-size="14" font-weight="700" letter-spacing="2">PLACEHOLDER</text>
  <text x="${w / 2}" y="${h / 2 - 8}" text-anchor="middle" fill="${brand.white}" font-family="system-ui,sans-serif" font-size="48" font-weight="800">${title}</text>
  <text x="${w / 2}" y="${h / 2 + 36}" text-anchor="middle" fill="${brand.muted}" font-family="system-ui,sans-serif" font-size="20" font-weight="500">${subtitle}</text>
</svg>`;
}

const assets = [
  { file: 'hero-pipes.svg', title: 'Seamless Pipes', subtitle: 'Hero — replace with yard photo', w: 1600, h: 1000 },
  { file: 'erw-pipes.svg', title: 'ERW Pipes', subtitle: 'Product placeholder' },
  { file: 'ms-fittings.svg', title: 'MS Fittings', subtitle: 'Product placeholder' },
  { file: 'spiral-pipes.svg', title: 'Spiral Pipes', subtitle: 'Product placeholder' },
  { file: 'ms-flanges.svg', title: 'MS Flanges', subtitle: 'Product placeholder' },
  { file: 'hydraulic-pipes.svg', title: 'Hydraulic Pipes', subtitle: 'Product placeholder' },
  { file: 'hollow-sections.svg', title: 'Hollow Sections', subtitle: 'Product placeholder' },
  { file: 'industry-refinery.svg', title: 'Refineries', subtitle: 'Industry placeholder' },
  { file: 'industry-cement.svg', title: 'Cement Industry', subtitle: 'Industry placeholder' },
  { file: 'industry-oilgas.svg', title: 'Oil & Gas', subtitle: 'Industry placeholder' },
  { file: 'industry-chemical.svg', title: 'Chemical Industry', subtitle: 'Industry placeholder' },
  { file: 'jindal-certificate.svg', title: 'Jindal Partner', subtitle: 'Certificate placeholder — 2025–2026', w: 900, h: 1100, accent: '#166534' },
  { file: 'warehouse-contact.svg', title: 'Contact Us', subtitle: 'Warehouse / office photo placeholder', w: 1600, h: 900 },
  { file: 'catalogue-cover.svg', title: 'Product Catalogue', subtitle: 'PDF cover placeholder', w: 800, h: 1100 },
];

for (const a of assets) {
  const { file, title, subtitle, w, h, accent } = a;
  fs.writeFileSync(path.join(dir, file), svgPlaceholder({ title, subtitle, w, h, accent }));
  console.log('wrote', file);
}

console.log('done', assets.length);
