/**
 * Process WhatsApp yard photos → public/images/navkar/updates/*.webp
 * Move videos → public/media/updates/
 * Run: node scripts/process-updates-media.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const navkarDir = path.resolve('public/images/navkar');
const updatesImgDir = path.join(navkarDir, 'updates');
const mediaDir = path.resolve('public/media/updates');

fs.mkdirSync(updatesImgDir, { recursive: true });
fs.mkdirSync(mediaDir, { recursive: true });

function sortKey(name) {
  const m = name.match(/(\d+\.\d+\.\d+)\s*(AM|PM)/i);
  if (!m) return name;
  const [, time, mer] = m;
  const [h, min, sec] = time.split('.').map(Number);
  let hour = h;
  if (mer.toUpperCase() === 'PM' && hour < 12) hour += 12;
  if (mer.toUpperCase() === 'AM' && hour === 12) hour = 0;
  const dup = name.includes('(1)') ? 1 : name.includes('(2)') ? 2 : 0;
  return `${hour.toString().padStart(2, '0')}${min.toString().padStart(2, '0')}${sec.toString().padStart(2, '0')}-${dup}-${name}`;
}

const images = fs
  .readdirSync(navkarDir)
  .filter((f) => /^WhatsApp Image.*\.jpe?g$/i.test(f))
  .sort((a, b) => sortKey(a).localeCompare(sortKey(b)));

console.log(`Found ${images.length} WhatsApp images`);

const manifest = [];

for (let i = 0; i < images.length; i++) {
  const src = path.join(navkarDir, images[i]);
  const id = String(i + 1).padStart(2, '0');
  const base = `yard-${id}`;
  const dest960 = path.join(updatesImgDir, `${base}-960.webp`);
  const dest640 = path.join(updatesImgDir, `${base}-640.webp`);

  await sharp(src)
    .rotate()
    .resize({ width: 960, withoutEnlargement: true })
    .webp({ quality: 72, effort: 6 })
    .toFile(dest960);

  await sharp(src)
    .rotate()
    .resize({ width: 640, withoutEnlargement: true })
    .webp({ quality: 70, effort: 6 })
    .toFile(dest640);

  const size = fs.statSync(dest960).length;
  manifest.push({
    id: base,
    source: images[i],
    image: `/images/navkar/updates/${base}-960.webp`,
    thumb: `/images/navkar/updates/${base}-640.webp`,
    bytes: size,
  });
  console.log(`${base} ← ${images[i]} (${(size / 1024).toFixed(1)}KB)`);
}

const videos = fs
  .readdirSync(navkarDir)
  .filter((f) => /^WhatsApp Video.*\.mp4$/i.test(f))
  .sort((a, b) => sortKey(a).localeCompare(sortKey(b)));

for (let i = 0; i < videos.length; i++) {
  const src = path.join(navkarDir, videos[i]);
  const slug = `yard-walkthrough-${i + 1}`;
  const dest = path.join(mediaDir, `${slug}.mp4`);
  fs.copyFileSync(src, dest);
  const poster = path.join(updatesImgDir, `${slug}-poster.webp`);
  // Poster from first frame requires ffmpeg; use first yard image as fallback poster path in content
  console.log(`video ${slug}.mp4 ← ${videos[i]}`);
  manifest.push({ id: slug, source: videos[i], video: `/media/updates/${slug}.mp4`, poster: null });
}

fs.writeFileSync(path.join(updatesImgDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log('manifest written');
