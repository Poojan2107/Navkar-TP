/**
 * Publish a new yard update post (daily / timely SEO freshness).
 *
 * Usage:
 *   npm run new:update -- --title "ERW stock ready" --excerpt "Fresh bundles..." --tags "ERW Pipes,Vatva"
 *   npm run new:update -- --title "..." --excerpt "..." --from-inbox
 *
 * Drop raw photos in public/images/navkar/inbox/ then use --from-inbox
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve('.');
const inboxDir = path.join(root, 'public/images/navkar/inbox');
const doneDir = path.join(inboxDir, 'done');
const updatesImgDir = path.join(root, 'public/images/navkar/updates');
const contentDir = path.join(root, 'src/content/updates');

function arg(name, fallback = '') {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1) return fallback;
  return process.argv[i + 1] ?? fallback;
}

const title = arg('title');
const excerpt = arg('excerpt');
const tagsRaw = arg('tags', 'Stock Update,Vatva');
const fromInbox = process.argv.includes('--from-inbox');
const featured = process.argv.includes('--featured');

if (!title || !excerpt) {
  console.error(`
Usage:
  npm run new:update -- --title "Your headline" --excerpt "Two sentences..." [--tags "ERW Pipes,Vatva"] [--from-inbox] [--featured]

Workflow:
  1. Drop WhatsApp / yard JPEGs in public/images/navkar/inbox/
  2. Run with --from-inbox to attach the oldest inbox photo
  3. npm run build && deploy (rebuild triggers sitemap + RSS lastmod)
`);
  process.exit(1);
}

fs.mkdirSync(inboxDir, { recursive: true });
fs.mkdirSync(doneDir, { recursive: true });
fs.mkdirSync(updatesImgDir, { recursive: true });
fs.mkdirSync(contentDir, { recursive: true });

const today = new Date();
const isoDate = today.toISOString().slice(0, 10);
const slugBase = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '')
  .slice(0, 48);
const slug = `${isoDate}-${slugBase}`;

let imageBase = slug;
let sourceFile = null;

if (fromInbox) {
  const inboxFiles = fs
    .readdirSync(inboxDir)
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .sort();
  if (inboxFiles.length === 0) {
    console.error('No images in public/images/navkar/inbox/ — add a photo first.');
    process.exit(1);
  }
  sourceFile = path.join(inboxDir, inboxFiles[0]);
  console.log(`Using inbox image: ${inboxFiles[0]}`);
} else {
  // Re-use numbering if no inbox — next yard-NN id
  const existing = fs
    .readdirSync(updatesImgDir)
    .filter((f) => /^yard-\d+-960\.webp$/i.test(f))
    .map((f) => parseInt(f.match(/yard-(\d+)/)[1], 10));
  const next = existing.length ? Math.max(...existing) + 1 : 1;
  imageBase = `yard-${String(next).padStart(2, '0')}`;
}

const dest960 = path.join(updatesImgDir, `${imageBase}-960.webp`);
const dest640 = path.join(updatesImgDir, `${imageBase}-640.webp`);

if (sourceFile) {
  await sharp(sourceFile)
    .rotate()
    .resize({ width: 960, withoutEnlargement: true })
    .webp({ quality: 72, effort: 6 })
    .toFile(dest960);
  await sharp(sourceFile)
    .rotate()
    .resize({ width: 640, withoutEnlargement: true })
    .webp({ quality: 70, effort: 6 })
    .toFile(dest640);
  fs.renameSync(sourceFile, path.join(doneDir, path.basename(sourceFile)));
} else if (!fs.existsSync(dest960)) {
  console.warn(`No inbox image and ${dest960} missing — add --from-inbox or process images first.`);
  process.exit(1);
}

const tags = tagsRaw.split(',').map((t) => t.trim()).filter(Boolean);
const mdPath = path.join(contentDir, `${slug}.md`);

if (fs.existsSync(mdPath)) {
  console.error(`Post already exists: ${mdPath}`);
  process.exit(1);
}

const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
excerpt: "${excerpt.replace(/"/g, '\\"')}"
date: ${isoDate}
image: "/images/navkar/updates/${imageBase}-960.webp"
thumb: "/images/navkar/updates/${imageBase}-640.webp"
tags: [${tags.map((t) => `"${t}"`).join(', ')}]
featured: ${featured}
---

Fresh stock from **Navkar Tubes & Tools**, Ahmedabad — authorized Jindal partner. Share your size and quantity for a free quote from Vatva or Rakhial dispatch.
`;

fs.writeFileSync(mdPath, frontmatter);
console.log(`\n✓ Created ${path.relative(root, mdPath)}`);
console.log(`✓ Image /images/navkar/updates/${imageBase}-960.webp`);
console.log('\nNext: npm run build && deploy');
