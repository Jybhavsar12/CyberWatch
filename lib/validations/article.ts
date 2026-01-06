import { z } from 'zod'

export const articleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  content: z.string().optional(),
  url: z.string().url('Invalid URL'),
  imageUrl: z.string().url().optional(),
  source: z.string().min(1, 'Source is required'),
  category: z.enum(['tech', 'cybersecurity', 'both']),
  publishedAt: z.string().datetime(),
  author: z.string().optional(),
  tags: z.array(z.string()).default([]),
})

export const saveArticleSchema = z.object({
  articleId: z.string().uuid(),
})

export const searchQuerySchema = z.object({
  query: z.string().min(1).max(100),
  category: z.enum(['tech', 'cybersecurity', 'all']).optional(),
})

export type ArticleInput = z.infer<typeof articleSchema>
export type SaveArticleInput = z.infer<typeof saveArticleSchema>
export type SearchQueryInput = z.infer<typeof searchQuerySchema>

