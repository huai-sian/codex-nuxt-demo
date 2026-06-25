import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    articles: defineCollection({
      type: 'page',
      source: 'articles/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        image: z.string(),
        slug: z.string(),
        locale: z.enum(['zh', 'en', 'ko']),
        tags: z.array(z.string()).default([])
      })
    })
  }
})
