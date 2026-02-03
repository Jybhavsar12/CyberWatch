import { auth } from '@/lib/auth'
import { sql } from '@/lib/db/neon'
import { rateLimit } from '@/lib/middleware/rate-limit'
import { addSecurityHeaders } from '@/lib/middleware/security'
import { NextRequest, NextResponse } from 'next/server'

// GET - Fetch comments for an article
export async function GET(request: NextRequest) {
  const rateLimitResult = rateLimit(request, 30, 60000)
  if (!rateLimitResult.success) {
    return rateLimitResult.response
  }

  try {
    const { searchParams } = new URL(request.url)
    const articleUrl = searchParams.get('articleUrl')

    if (!articleUrl) {
      return NextResponse.json(
        { error: 'Article URL is required' },
        { status: 400 }
      )
    }

    const comments = await sql`
      SELECT id, article_url, user_name, comment, created_at
      FROM article_comments
      WHERE article_url = ${articleUrl}
      ORDER BY created_at DESC
      LIMIT 100
    ` as any[]

    const response = NextResponse.json({ comments })
    return addSecurityHeaders(response)
  } catch (error) {
    console.error('Error fetching comments:', error)
    const response = NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    )
    return addSecurityHeaders(response)
  }
}

// POST - Create a new comment
export async function POST(request: NextRequest) {
  const rateLimitResult = rateLimit(request, 10, 60000)
  if (!rateLimitResult.success) {
    return rateLimitResult.response
  }

  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized - Please login to comment' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { articleUrl, comment } = body

    if (!articleUrl || !comment) {
      return NextResponse.json(
        { error: 'Article URL and comment are required' },
        { status: 400 }
      )
    }

    if (comment.trim().length < 1 || comment.length > 1000) {
      return NextResponse.json(
        { error: 'Comment must be between 1 and 1000 characters' },
        { status: 400 }
      )
    }

    const result = await sql`
      INSERT INTO article_comments (article_url, user_id, user_name, user_email, comment)
      VALUES (
        ${articleUrl},
        ${session.user.id},
        ${session.user.name || session.user.email?.split('@')[0] || 'Anonymous'},
        ${session.user.email},
        ${comment.trim()}
      )
      RETURNING id, article_url, user_name, comment, created_at
    ` as any[]

    const response = NextResponse.json({ comment: result[0] })
    return addSecurityHeaders(response)
  } catch (error) {
    console.error('Error creating comment:', error)
    const response = NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    )
    return addSecurityHeaders(response)
  }
}

