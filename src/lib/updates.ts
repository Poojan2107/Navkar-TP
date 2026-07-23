import { getCollection, type CollectionEntry } from 'astro:content';
import { images } from '../data/images';

export type UpdateEntry = CollectionEntry<'updates'>;

/** Static fallbacks if content collection fails to sync in dev */
const FALLBACK: UpdateEntry[] = [
  {
    id: 'erw-pipe-stock-vatva-yard',
    collection: 'updates',
    data: {
      title: 'Jindal ERW pipe stock — Vatva yard',
      excerpt: 'MS ERW black pipes staged at Navkar Tubes Vatva yard — 15 MM to 500 MM on enquiry.',
      date: new Date('2026-07-22'),
      image: images.updates.erwStock,
      thumb: images.updates.erwStock,
      tags: ['ERW Pipes', 'Jindal', 'Vatva'],
      featured: true,
    },
  },
  {
    id: 'spiral-pipes-yard-stock',
    collection: 'updates',
    data: {
      title: 'Spiral pipes — yard stock',
      excerpt: 'Large diameter spiral welded pipes ready for Gujarat dispatch.',
      date: new Date('2026-07-10'),
      image: images.updates.spiralStock,
      thumb: images.updates.spiralStock,
      tags: ['Spiral Pipes'],
      featured: false,
    },
  },
  {
    id: 'hollow-sections-gi-stock',
    collection: 'updates',
    data: {
      title: 'Hollow sections & GI stock',
      excerpt: 'Square and rectangular hollow sections including Jindal GI range.',
      date: new Date('2026-07-05'),
      image: images.updates.hollowStock,
      thumb: images.updates.hollowStock,
      tags: ['Hollow Sections'],
      featured: false,
    },
  },
  {
    id: 'ms-pipe-bundles-yard',
    collection: 'updates',
    data: {
      title: 'MS pipe bundles — yard ready',
      excerpt: 'Bundled MS pipes staged for loading from Ahmedabad stockyards.',
      date: new Date('2026-07-03'),
      image: images.updates.erwBundles,
      thumb: images.updates.erwBundles,
      tags: ['ERW Pipes', 'Dispatch'],
      featured: false,
    },
  },
  {
    id: 'pipe-loading-gujarat-dispatch',
    collection: 'updates',
    data: {
      title: 'Pipe loading — Gujarat dispatch',
      excerpt: 'Outbound loading from Vatva for project sites across Gujarat.',
      date: new Date('2026-07-01'),
      image: images.updates.dispatch,
      thumb: images.updates.dispatch,
      tags: ['Dispatch'],
      featured: false,
    },
  },
] as UpdateEntry[];

export async function getSortedUpdates(): Promise<UpdateEntry[]> {
  const entries = await getCollection('updates');
  const list = entries.length > 0 ? entries : FALLBACK;
  return list
    .filter((e) => !('draft' in e.data && e.data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

function titleKey(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\b(snapshot|stock|yard|vatva|ahmedabad|jindal|ms|pipe|pipes)\b/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 28);
}

/** Drop near-duplicate titles (manual + auto-publish twins) */
export async function getUniqueUpdates(): Promise<UpdateEntry[]> {
  const sorted = await getSortedUpdates();
  const seen = new Set<string>();
  const unique: UpdateEntry[] = [];

  for (const post of sorted) {
    const key = titleKey(post.data.title);
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(post);
  }

  return unique;
}

/** Prefer variety for homepage cards — avoid three near-duplicate ERW posts */
export async function getHomepageUpdates(limit = 3): Promise<UpdateEntry[]> {
  const sorted = await getUniqueUpdates();
  const picked: UpdateEntry[] = [];
  const usedTags = new Set<string>();

  for (const post of sorted) {
    const primary = (post.data.tags[0] ?? post.id).toLowerCase();
    if (picked.length > 0 && usedTags.has(primary) && picked.length < limit) continue;
    picked.push(post);
    usedTags.add(primary);
    if (picked.length >= limit) break;
  }

  if (picked.length < limit) {
    for (const post of sorted) {
      if (picked.some((p) => p.id === post.id)) continue;
      picked.push(post);
      if (picked.length >= limit) break;
    }
  }

  return picked;
}
