import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { SLUGS_CATEGORIAS } from './lib/categorias';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string().max(200),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			category: z.enum(SLUGS_CATEGORIAS),
			tags: z.array(z.string()).default([]),
			// Rascunhos aparecem no `npm run dev`, mas ficam fora do build de produção
			draft: z.boolean().default(false),
			cover: image().optional(),
			coverAlt: z.string().optional(),
		}),
});

export const collections = { blog };
