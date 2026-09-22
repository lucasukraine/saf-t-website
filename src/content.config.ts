import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    label: z.string(), // editorial rubric shown above the title
    order: z.number(), // tiebreaker for posts with the same pubDate (lists are newest-first)
  }),
});

export const collections = { blog };
