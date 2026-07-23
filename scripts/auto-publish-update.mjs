/**
 * Automated yard update publisher — zero manual work after handover.
 *
 * Rotates through public/images/navkar/updates/yard-*.webp + SEO templates.
 * Processes public/images/navkar/inbox/ first if new photos were dropped.
 *
 * Usage:
 *   npm run auto:update           # publish if not already done today
 *   npm run auto:update -- --force # publish even if one exists today
 *   npm run auto:update -- --dry-run
 *
 * Scheduled via .github/workflows/auto-publish-updates.yml (Mon/Wed/Fri 6:30 AM IST)
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve('.');
const manifestPath = path.join(root, 'public/images/navkar/updates/manifest.json');
const templatesPath = path.join(root, 'scripts/update-templates.json');
const statePath = path.join(root, 'scripts/update-schedule-state.json');
const contentDir = path.join(root, 'src/content/updates');
const inboxDir = path.join(root, 'public/images/navkar/inbox');
const doneDir = path.join(inboxDir, 'done');
const updatesImgDir = path.join(root, 'public/images/navkar/updates');

const force = process.argv.includes('--force');
const dryRun = process.argv.includes('--dry-run');

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40);
}

function loadJson(file, fallback) {
  if (!fs.existsSync(file)) return fallback;
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function saveJson(file, data) {
  if (!dryRun) fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
}

function existingPostsToday(isoDate) {
  if (!fs.existsSync(contentDir)) return [];
  return fs.readdirSync(contentDir).filter((f) => f.startsWith(isoDate) && f.endsWith('.md'));
}

function getYardPool() {
  const manifest = loadJson(manifestPath, []);
  return manifest.filter((m) => m.image && /^yard-\d+/.test(m.id));
}

async function processInboxImage() {
  fs.mkdirSync(inboxDir, { recursive: true });
  fs.mkdirSync(doneDir, { recursive: true });
  const files = fs
    .readdirSync(inboxDir)
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .sort();
  if (!files.length) return null;

  const existing = fs
    .readdirSync(updatesImgDir)
    .filter((f) => /^yard-\d+-960\.webp$/i.test(f))
    .map((f) => parseInt(f.match(/yard-(\d+)/)[1], 10));
  const next = existing.length ? Math.max(...existing) + 1 : 1;
  const id = `yard-${String(next).padStart(2, '0')}`;
  const source = path.join(inboxDir, files[0]);

  if (!dryRun) {
    await sharp(source)
      .rotate()
      .resize({ width: 960, withoutEnlargement: true })
      .webp({ quality: 72, effort: 6 })
      .toFile(path.join(updatesImgDir, `${id}-960.webp`));
    await sharp(source)
      .rotate()
      .resize({ width: 640, withoutEnlargement: true })
      .webp({ quality: 70, effort: 6 })
      .toFile(path.join(updatesImgDir, `${id}-640.webp`));
    fs.renameSync(source, path.join(doneDir, files[0]));

    const manifest = loadJson(manifestPath, []);
    manifest.push({
      id,
      source: files[0],
      image: `/images/navkar/updates/${id}-960.webp`,
      thumb: `/images/navkar/updates/${id}-640.webp`,
      autoInbox: true,
    });
    saveJson(manifestPath, manifest);
  }

  console.log(`Processed inbox → ${id}`);
  return {
    id,
    image: `/images/navkar/updates/${id}-960.webp`,
    thumb: `/images/navkar/updates/${id}-640.webp`,
  };
}

function unfeaturePreviousAutoPosts() {
  if (!fs.existsSync(contentDir) || dryRun) return;
  for (const file of fs.readdirSync(contentDir)) {
    if (!file.endsWith('.md')) continue;
    const full = path.join(contentDir, file);
    let text = fs.readFileSync(full, 'utf8');
    if (text.includes('autoPublished: true') && /featured: true/.test(text)) {
      text = text.replace(/featured: true/, 'featured: false');
      fs.writeFileSync(full, text);
    }
  }
}

function writePost({ isoDate, slug, template, yard, featured, autoPublished }) {
  const mdPath = path.join(contentDir, `${slug}.md`);
  const frontmatter = `---
title: "${template.title.replace(/"/g, '\\"')}"
excerpt: "${template.excerpt.replace(/"/g, '\\"')}"
date: ${isoDate}
image: "${yard.image}"
thumb: "${yard.thumb ?? yard.image.replace('-960', '-640')}"
tags: [${template.tags.map((t) => `"${t}"`).join(', ')}]
featured: ${featured}
autoPublished: ${autoPublished}
---

${template.body}
`;
  if (!dryRun) {
    fs.mkdirSync(contentDir, { recursive: true });
    fs.writeFileSync(mdPath, frontmatter);
  }
  return mdPath;
}

async function main() {
  const isoDate = todayIso();
  const todayPosts = existingPostsToday(isoDate);

  if (todayPosts.length && !force) {
    console.log(`Skip — update already published today: ${todayPosts.join(', ')}`);
    process.exit(0);
  }

  const templates = loadJson(templatesPath, []);
  const state = loadJson(statePath, {
    imageIndex: 0,
    templateIndex: 0,
    cycle: 1,
    lastPublishedDate: null,
    lastSlug: null,
    totalPublished: 0,
  });

  if (!templates.length) {
    console.error('No templates in scripts/update-templates.json');
    process.exit(1);
  }

  let yard = await processInboxImage();
  if (!yard) {
    const pool = getYardPool();
    if (!pool.length) {
      console.error('No yard images in manifest — run npm run process:updates first.');
      process.exit(1);
    }
    yard = pool[state.imageIndex % pool.length];
    state.imageIndex = (state.imageIndex + 1) % pool.length;
    if (state.imageIndex === 0) state.cycle += 1;
  }

  const template = templates[state.templateIndex % templates.length];
  state.templateIndex = (state.templateIndex + 1) % templates.length;

  const slugSuffix = todayPosts.length ? `-auto-${todayPosts.length + 1}` : '';
  const slug = `${isoDate}-${slugify(template.title)}${slugSuffix}`;

  if (dryRun) {
    console.log('[dry-run] Would publish:', slug);
    console.log('  image:', yard.image);
    console.log('  title:', template.title);
    process.exit(0);
  }

  unfeaturePreviousAutoPosts();

  const mdPath = writePost({
    isoDate,
    slug,
    template,
    yard,
    featured: true,
    autoPublished: true,
  });

  state.lastPublishedDate = isoDate;
  state.lastSlug = slug;
  state.totalPublished += 1;
  saveJson(statePath, state);

  console.log(`✓ Published ${path.relative(root, mdPath)}`);
  console.log(`  cycle ${state.cycle} · total auto posts: ${state.totalPublished}`);
  console.log('  Next: npm run build && deploy');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
