import { rateLimit } from '@/lib/middleware/rate-limit'
import { addSecurityHeaders } from '@/lib/middleware/security'
import { sql } from '@/lib/db/neon'
import { searchQuerySchema } from '@/lib/validations/article'
import { NextRequest, NextResponse } from 'next/server'

// Cache search results for 1 hour
export const revalidate = 3600

export async function GET(request: NextRequest) {
  // Rate limiting
  const rateLimitResult = rateLimit(request, 20, 60000)
  if (!rateLimitResult.success) {
    return rateLimitResult.response
  }

  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const category = searchParams.get('category') as 'tech' | 'cybersecurity' | 'all'

    // Validate input
    const validation = searchQuerySchema.safeParse({ query, category })
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid search query', details: validation.error.issues },
        { status: 400 }
      )
    }

    // Build SQL query
    let articles
    if (category && category !== 'all') {
      articles = await sql`
        SELECT * FROM articles
        WHERE (title ILIKE ${'%' + query + '%'} OR description ILIKE ${'%' + query + '%'})
        AND category = ${category}
        ORDER BY published_at DESC
        LIMIT 50
      `
    } else {
      articles = await sql`
        SELECT * FROM articles
        WHERE title ILIKE ${'%' + query + '%'} OR description ILIKE ${'%' + query + '%'}
        ORDER BY published_at DESC
        LIMIT 50
      `
    }

    const response = NextResponse.json({ articles, count: articles?.length || 0 })

    // Add cache headers - cache for 1 hour
    response.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=7200')

    return addSecurityHeaders(response)
  } catch (error) {
    console.error('Error searching news:', error)
    const response = NextResponse.json(
      { error: 'Failed to search news' },
      { status: 500 }
    )
    return addSecurityHeaders(response)
  }
}

