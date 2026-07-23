/**
 * Generate 1200×630 OG / social share image (JPG).
 * Usage: node scripts/make-og-image.mjs
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'public/images/navkar/yard-1.webp');
const out = join(root, 'public/og-image.jpg');

const W = 1200;
const H = 630;

const overlay = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a2a38" stop-opacity="0.92"/>
      <stop offset="55%" stop-color="#004462" stop-opacity="0.78"/>
      <stop offset="100%" stop-color="#0a2a38" stop-opacity="0.55"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <text x="72" y="220" fill="#8fc5cb" font-family="Arial, sans-serif" font-size="28" font-weight="700" letter-spacing="4">JINDAL AUTHORIZED PARTNER</text>
  <text x="72" y="320" fill="#ffffff" font-family="Arial Black, Arial, sans-serif" font-size="92" font-weight="800">NAVKAR TUBES</text>
  <text x="72" y="390" fill="#6eb5bc" font-family="Arial, sans-serif" font-size="32" font-weight="600" letter-spacing="6">AND TOOLS · AHMEDABAD</text>
  <text x="72" y="520" fill="#d4ecef" font-family="Arial, sans-serif" font-size="28">MS ERW · Hollow sections · Fittings · 15–500 MM</text>
</svg>
`);

await mkdir(dirname(out), { recursive: true });

await sharp(src)
  .resize(W, H, { fit: 'cover', position: 'centre' })
  .composite([{ input: overlay, top: 0, left: 0 }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(out);

console.log('Wrote', out);
