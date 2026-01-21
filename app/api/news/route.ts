import { rateLimit } from '@/lib/middleware/rate-limit'
import { addSecurityHeaders } from '@/lib/middleware/security'
import { fetchNewsFromRSS } from '@/lib/services/news-aggregator'
import { sql } from '@/lib/db/neon'
import { NextRequest, NextResponse } from 'next/server'

// Enable edge runtime for better performance
export const runtime = 'nodejs'
// Revalidate every 5 minutes (300 seconds) for fresher content
export const revalidate = 300
// Disable static generation to ensure dynamic data fetching
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  // Rate limiting
  const rateLimitResult = rateLimit(request, 30, 60000)
  if (!rateLimitResult.success) {
    return rateLimitResult.response
  }

  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') as 'tech' | 'cybersecurity' | 'all' || 'all'
    const limit = parseInt(searchParams.get('limit') || '20')

    // Fetch news from RSS feeds
    const news = await fetchNewsFromRSS(category)

    // Convert to article format
    const articles = news.slice(0, limit).map((item) => ({
      id: item.url, // Use URL as unique ID
      title: item.title,
      description: item.description,
      url: item.url,
      image_url: item.imageUrl || null,
      source: item.source,
      category: item.category,
      published_at: item.publishedAt.toISOString(),
      author: item.author || null,
      tags: item.tags,
    }))

    // Try to store in database (optional - won't fail if table doesn't exist)
    // Only store if we have fresh data (not from cache)
    try {
      // Batch upsert for better performance
      if (articles.length > 0) {
        for (const article of articles) {
          await sql`
            INSERT INTO articles (
              title, description, content, url, image_url, source,
              category, published_at, author, tags
            )
            VALUES (
              ${article.title}, ${article.description}, ${article.content},
              ${article.url}, ${article.imageUrl}, ${article.source},
              ${article.category}, ${article.publishedAt}, ${article.author},
              ${article.tags}
            )
            ON CONFLICT (url) DO NOTHING
          `
        }
      }
    } catch (dbError) {
      // Database storage is optional - continue even if it fails
      console.log('Database storage skipped:', dbError)
    }

    const response = NextResponse.json({ articles, count: articles.length })

    // Add cache headers - cache for 5 minutes with stale-while-revalidate
    // This allows fresh content on refresh while maintaining performance
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600, must-revalidate')

    return addSecurityHeaders(response)
  } catch (error) {
    console.error('Error fetching news:', error)
    const response = NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    )
    return addSecurityHeaders(response)
  }
}

