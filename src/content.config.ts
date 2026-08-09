import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { CONTEXTS, DEMO_TYPES, DOMAINS, TEAMS } from './lib/taxonomy';

/**
 * Project schema. Deliberately small — see DIRECTION.md 5.2.
 * Adding a field here is a field to fill in for every future project forever.
 * A missing or mistyped value fails the build; that is the point.
 *
 * Notably absent: `depth`. Variant C's machine -> product axis was rejected.
 */
const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.mdx' }),
  schema: z.object({
    title: z.string(),
    /** One sentence. Used on the card and as the meta description. */
    summary: z.string(),
    domain: z.enum(DOMAINS),
    tech: z.array(z.string()).min(1),
    context: z.enum(CONTEXTS),
    team: z.enum(TEAMS),
    period: z.string(),

    featured: z.boolean().default(false),
    /** Optional. Unused until ordering actually matters — never infer order from filenames. */
    featuredOrder: z.number().int().optional(),

    demo: z
      .object({
        type: z.enum(DEMO_TYPES),
        /** Overrides the default label for this demo type. */
        label: z.string().optional(),
      })
      .default({ type: 'none' }),

    links: z
      .object({
        repo: z.string().url().optional(),
        live: z.string().url().optional(),
      })
      .default({}),

    /** Featured projects need real media at launch, not placeholders. DIRECTION.md 4.5. */
    cover: z.string().optional(),
  }),
});

export const collections = { projects };
