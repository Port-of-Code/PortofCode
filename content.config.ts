import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    shipyard: defineCollection({
      type: 'page',
      source: {
        include: 'shipyard/**',
        exclude: ['shipyard/_dir.yml'],
      },
      schema: z.object({
        section: z.string().default('shipyard'),
        type: z.enum(['experiment-log', 'build-guide', 'architecture-report', 'launch']).default('build-guide'),
        tags: z.array(z.string()).default([]),
        status: z.enum(['active', 'complete', 'archived']).default('active'),
        date: z.string(),
      }),
    }),
    fleet: defineCollection({
      type: 'page',
      source: {
        include: 'fleet/**',
        exclude: ['fleet/_dir.yml'],
      },
      schema: z.object({
        section: z.string().default('fleet'),
        type: z.enum(['agent', 'experiment-log', 'build-guide', 'architecture-report', 'launch']).default('architecture-report'),
        tags: z.array(z.string()).default([]),
        status: z.enum(['active', 'standby', 'offline', 'complete', 'archived']).default('active'),
        date: z.string(),
        // Agent-specific fields
        designation: z.string().optional(),
        role: z.string().optional(),
        model: z.string().optional(),
        platform: z.string().optional(),
      }),
    }),
    logs: defineCollection({
      type: 'page',
      source: {
        include: 'logs/**',
        exclude: ['logs/_dir.yml'],
      },
      schema: z.object({
        section: z.string().default('logs'),
        type: z.string().default('experiment-log'),
        experiment: z.number().optional(),
        tags: z.array(z.string()).default([]),
        status: z.enum(['active', 'complete', 'archived']).default('active'),
        date: z.string(),
      }),
    }),
    content: defineCollection({
      type: 'page',
      source: '**',
    }),
  },
})
