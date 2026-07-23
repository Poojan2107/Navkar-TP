import fs from 'fs';
import https from 'https';
import http from 'http';
import path from 'path';
import { URL } from 'url';

function fetchBuf(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    lib
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return fetchBuf(new URL(res.headers.location, url).href).then(resolve).catch(reject);
        }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => resolve({ status: res.statusCode, buf: Buffer.concat(chunks) }));
      })
      .on('error', reject);
  });
}

const outDir = path.join('public', 'images', 'navkar');
fs.mkdirSync(outDir, { recursive: true });

const { buf: htmlBuf } = await fetchBuf('https://navkartube.com/');
const html = htmlBuf.toString('utf8');
fs.writeFileSync('public/scraped-home.html', html);

const urls = [
  ...html.matchAll(/(?:src|data-src|data-lazy-src|href)=["']([^"']+\.(?:jpg|jpeg|png|webp|svg|gif)(?:\?[^"']*)?)/gi),
].map((m) => m[1]);

const abs = [
  ...new Set(
    urls
      .map((u) => {
        try {
          return new URL(u, 'https://navkartube.com/').href;
        } catch {
          return null;
        }
      })
      .filter(Boolean)
  ),
];

console.log('FOUND', abs.length);
abs.forEach((u) => console.log(u));
fs.writeFileSync(path.join(outDir, 'sources.json'), JSON.stringify(abs, null, 2));

let i = 0;
for (const u of abs) {
  // Skip tracking pixels / tiny icons from CDNs we don't need
  if (/google|facebook|trustindex|gravatar|w\.org|emoji/i.test(u)) continue;
  try {
    const { status, buf } = await fetchBuf(u);
    if (status !== 200 || buf.length < 800) {
      console.log('SKIP', status, buf.length, u);
      continue;
    }
    const ext = path.extname(new URL(u).pathname).split('?')[0] || '.jpg';
    const base = path
      .basename(new URL(u).pathname, ext)
      .replace(/[^a-z0-9-_]/gi, '-')
      .slice(0, 40);
    const name = `${String(i++).padStart(2, '0')}-${base || 'asset'}${ext}`;
    fs.writeFileSync(path.join(outDir, name), buf);
    console.log('SAVED', name, buf.length);
  } catch (e) {
    console.log('FAIL', u, e.message);
  }
}
