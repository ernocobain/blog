import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.string(),
        cover: z.string().optional(),
        coverDesktop: z.string(),
        coverMobile: z.string(),
        tags: z.array(z.string()).optional().default([]),
        excerpt: z.string(),
        _id: z.string()
      })
    })
  }
})
