import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(['tax', 'wealth', 'subsidy', 'credit']),
    categoryName: z.string(),
    tags: z.array(z.string()).default([]),
    author: z.string().default('머니인사이트 리서치팀'),
    officialSources: z.array(
      z.object({
        name: z.string(),
        url: z.string(),
      })
    ).optional(),
    featured: z.boolean().default(false),
    readingTime: z.string().default('5분'),
  }),
});

export const collections = {
  blog: blogCollection,
};
