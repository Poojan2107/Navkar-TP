import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const updates = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/updates' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.coerce.date(),
    image: z.string(),
    thumb: z.string().optional(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    gallery: z.array(z.string()).optional(),
    video: z.string().optional(),
    /** Hide near-duplicates from listings (URLs still build if referenced) */
    draft: z.boolean().default(false),
    /** Set by auto-publish cron — do not remove */
    autoPublished: z.boolean().optional(),
  }),
});

export const collections = { updates };
