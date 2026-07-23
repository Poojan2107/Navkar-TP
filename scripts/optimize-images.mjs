/**
 * Compress public/images/navkar assets + generate hero srcset variants.
 * Run: node scripts/optimize-images.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve('public/images/navkar');
const heroSource = path.join(root, 'yard-1.webp');

async function optimizeFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const buf = fs.readFileSync(filePath);
  const before = buf.length;
  let out;

  if (ext === '.webp') {
    out = await sharp(buf).webp({ quality: 72, effort: 6 }).toBuffer();
  } else if (ext === '.jpg' || ext === '.jpeg') {
    out = await sharp(buf).jpeg({ quality: 78, mozjpeg: true }).toBuffer();
  } else if (ext === '.png') {
    out = await sharp(buf).png({ compressionLevel: 9, palette: true }).toBuffer();
  } else {
    return;
  }

  if (out.length < before) {
    fs.writeFileSync(filePath, out);
    console.log(
      `ok ${path.basename(filePath)} ${(before / 1024).toFixed(1)}KB → ${(out.length / 1024).toFixed(1)}KB`
    );
  } else {
    console.log(`skip ${path.basename(filePath)} (already small)`);
  }
}

async function makeHeroVariants() {
  if (!fs.existsSync(heroSource)) {
    console.warn('Hero source missing:', heroSource);
    return;
  }

  const widths = [640, 960, 1280];
  for (const w of widths) {
    const dest = path.join(root, `hero-${w}.webp`);
    await sharp(heroSource)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 70, effort: 6 })
      .toFile(dest);
    const size = fs.statSync(dest).length;
    console.log(`hero ${w}w → ${(size / 1024).toFixed(1)}KB`);
  }
  // Remove stale upscaled twin if present
  const stale1600 = path.join(root, 'hero-1600.webp');
  if (fs.existsSync(stale1600)) {
    fs.unlinkSync(stale1600);
    console.log('removed hero-1600.webp (source too small to upscale)');
  }
}

async function convertHeavyRaster() {
  const map = [
    ['cement.jpg', 'cement.webp'],
    ['chemical.jpg', 'chemical.webp'],
    ['hollow.jpg', 'hollow.webp'],
    ['hydraulic.jpeg', 'hydraulic.webp'],
    ['pipes-stack.jpeg', 'pipes-stack.webp'],
  ];

  for (const [from, to] of map) {
    const src = path.join(root, from);
    const dest = path.join(root, to);
    if (!fs.existsSync(src)) continue;
    await sharp(src)
      .webp({ quality: 72, effort: 6 })
      .toFile(dest);
    const size = fs.statSync(dest).length;
    console.log(`convert ${from} → ${to} (${(size / 1024).toFixed(1)}KB)`);
  }
}

const files = fs.readdirSync(root).filter((f) => /\.(webp|jpe?g|png)$/i.test(f) && !f.startsWith('hero-'));
for (const f of files) {
  await optimizeFile(path.join(root, f));
}
await convertHeavyRaster();
await makeHeroVariants();
console.log('done');
