import { getSession } from '@/lib/auth'
import { sql } from '@/lib/db/neon'
import { rateLimit } from '@/lib/middleware/rate-limit'
import { addSecurityHeaders } from '@/lib/middleware/security'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const rateLimitResult = rateLimit(request, 30, 60000)
  if (!rateLimitResult.success) {
    return rateLimitResult.response
  }

  try {
    const session = await getSession()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch saved articles with article details using JOIN
    const savedArticles = await sql`
      SELECT
        sa.id,
        sa.user_id,
        sa.article_id,
        sa.created_at,
        a.id as article_id,
        a.title,
        a.description,
        a.content,
        a.url,
        a.image_url,
        a.source,
        a.category,
        a.published_at,
        a.author,
        a.tags
      FROM saved_articles sa
      JOIN articles a ON sa.article_id = a.id
      WHERE sa.user_id = ${session.user.id}
      ORDER BY sa.created_at DESC
    ` as any[]

    const response = NextResponse.json({ savedArticles })
    return addSecurityHeaders(response)
  } catch (error) {
    console.error('Error fetching saved articles:', error)
    const response = NextResponse.json(
      { error: 'Failed to fetch saved articles' },
      { status: 500 }
    )
    return addSecurityHeaders(response)
  }
}

export async function POST(request: NextRequest) {
  const rateLimitResult = rateLimit(request, 10, 60000)
  if (!rateLimitResult.success) {
    return rateLimitResult.response
  }

  try {
    const session = await getSession()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { articleId } = body

    const result = await sql`
      INSERT INTO saved_articles (user_id, article_id)
      VALUES (${session.user.id}, ${articleId})
      RETURNING *
    ` as any[]

    const response = NextResponse.json({ savedArticle: result[0] })
    return addSecurityHeaders(response)
  } catch (error) {
    console.error('Error saving article:', error)
    const response = NextResponse.json(
      { error: 'Failed to save article' },
      { status: 500 }
    )
    return addSecurityHeaders(response)
  }
}

export async function DELETE(request: NextRequest) {
  const rateLimitResult = rateLimit(request, 10, 60000)
  if (!rateLimitResult.success) {
    return rateLimitResult.response
  }

  try {
    const session = await getSession()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const articleId = searchParams.get('articleId')

    await sql`
      DELETE FROM saved_articles
      WHERE user_id = ${session.user.id}
      AND article_id = ${articleId}
    `

    const response = NextResponse.json({ success: true })
    return addSecurityHeaders(response)
  } catch (error) {
    console.error('Error deleting saved article:', error)
    const response = NextResponse.json(
      { error: 'Failed to delete saved article' },
      { status: 500 }
    )
    return addSecurityHeaders(response)
  }
}

