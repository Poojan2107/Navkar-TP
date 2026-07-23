import sharp from 'sharp';
import fs from 'fs';

const w = 720;
const h = 960;

const svg = Buffer.from(`<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0a2a38" stop-opacity="0.3"/>
      <stop offset="50%" stop-color="#004462" stop-opacity="0.78"/>
      <stop offset="100%" stop-color="#0a2a38" stop-opacity="0.96"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <text x="48" y="120" fill="#8fc5cb" font-family="Arial, sans-serif" font-size="20" font-weight="700" letter-spacing="5">PRODUCT BROCHURE</text>
  <text x="48" y="220" fill="#ffffff" font-family="Arial Black, Arial, sans-serif" font-size="70" font-weight="800">NAVKAR</text>
  <text x="48" y="298" fill="#ffffff" font-family="Arial Black, Arial, sans-serif" font-size="70" font-weight="800">TUBES</text>
  <text x="48" y="358" fill="#59a1a8" font-family="Arial, sans-serif" font-size="26" font-weight="600" letter-spacing="6">AND TOOLS</text>
  <rect x="48" y="398" width="64" height="4" fill="#59a1a8"/>
  <text x="48" y="458" fill="#d4ecef" font-family="Arial, sans-serif" font-size="22">Jindal Authorized Partner</text>
  <text x="48" y="498" fill="#b5dce1" font-family="Arial, sans-serif" font-size="19">MS ERW · Hollow · Fittings · Flanges</text>
  <text x="48" y="536" fill="#b5dce1" font-family="Arial, sans-serif" font-size="19">15 MM – 500 MM · Ahmedabad</text>
  <text x="48" y="900" fill="#8fc5cb" font-family="Arial, sans-serif" font-size="18">navkartube.com</text>
</svg>`);

const yard = await sharp('public/images/navkar/yard-1.webp')
  .resize(w, h, { fit: 'cover', position: 'centre' })
  .toBuffer();

await sharp(yard)
  .composite([{ input: svg, top: 0, left: 0 }])
  .webp({ quality: 84 })
  .toFile('public/images/navkar/brochure-cover.webp');

console.log('ok', fs.statSync('public/images/navkar/brochure-cover.webp').size);
