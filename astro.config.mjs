// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

const site = 'https://navkartube.com';

/** @type {Map<string, Date>} */
let updateDates = new Map();

async function loadUpdateDates() {
  if (updateDates.size) return updateDates;
  try {
    const { getCollection } = await import('astro:content');
    const posts = await getCollection('updates');
    for (const post of posts) {
      updateDates.set(`${site}/updates/${post.id}/`, post.data.date);
    }
    const latest = posts.reduce(
      (max, p) => (p.data.date > max ? p.data.date : max),
      new Date(0),
    );
    if (latest.getTime() > 0) {
      updateDates.set(`${site}/updates/`, latest);
    }
  } catch {
    /* content not synced yet */
  }
  return updateDates;
}

// https://astro.build/config
export default defineConfig({
  site,
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      async serialize(item) {
        const dates = await loadUpdateDates();
        const lastmod = dates.get(item.url);
        if (lastmod) {
          return {
            ...item,
            lastmod,
            changefreq: item.url.endsWith('/updates/') ? 'daily' : 'weekly',
            priority: item.url.endsWith('/updates/') ? 0.9 : 0.75,
          };
        }
        return item;
      },
    }),
  ],
});
