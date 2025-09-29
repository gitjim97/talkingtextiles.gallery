import { defineCollection, z } from 'astro:content';

const artists = defineCollection({
  type: 'content',
  schema: z.object({
    // file-based slug is used; no need to require slug in frontmatter
    title: z.string().optional(),
    artistName: z.string(),
    artistBio: z.string().min(10),
    artworkDescription: z.string().optional(),
    artworkTitle: z.string().optional(),
    heroImage: z.string().optional(),
    thumb: z.string().optional(),
  year: z.coerce.string().optional(),
    materials: z.string().optional(),
    keywords: z.array(z.string()).optional()
  })
});

export const collections = { artists };
