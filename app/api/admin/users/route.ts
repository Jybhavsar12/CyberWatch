import { rateLimit } from '@/lib/middleware/rate-limit'
import { addSecurityHeaders } from '@/lib/middleware/security'
import { sql } from '@/lib/db/neon'
import { getSession } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Rate limiting
  const rateLimitResult = rateLimit(request, 10, 60000)
  if (!rateLimitResult.success) {
    return rateLimitResult.response
  }

  try {
    const session = await getSession()

    // Check if user is authenticated
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized - Please sign in to access this page' },
        { status: 401 }
      )
    }

    // Check if user is admin (whitelist check)
    const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(email => email.trim().toLowerCase()) || []

    if (!adminEmails.includes(session.user.email.toLowerCase())) {
      return NextResponse.json(
        { error: 'Forbidden - Admin access only' },
        { status: 403 }
      )
    }

    // Fetch all users from database
    const authUsers = await sql`
      SELECT id, email, full_name, created_at, updated_at
      FROM users
      ORDER BY created_at DESC
    `

    // Fetch user preferences
    const userPreferences = await sql`
      SELECT * FROM user_preferences
    `

    // Fetch newsletter subscribers
    const subscribers = await sql`
      SELECT * FROM newsletter_subscribers
      ORDER BY subscribed_at DESC
    `

    // Fetch article comments to get user activity
    const comments = await sql`
      SELECT user_id, user_name, user_email, created_at
      FROM article_comments
      ORDER BY created_at DESC
      LIMIT 100
    `

    // Combine auth users with their preferences
    const usersWithPreferences = authUsers.map(authUser => {
      const prefs = userPreferences.find(p => p.user_id === authUser.id)
      return {
        id: authUser.id,
        email: authUser.email,
        full_name: authUser.full_name,
        created_at: authUser.created_at,
        updated_at: authUser.updated_at,
        preferences: prefs || null
      }
    })

    const response = NextResponse.json({
      authUsers: usersWithPreferences,
      subscribers: subscribers,
      recentActivity: comments,
      stats: {
        totalAuthUsers: usersWithPreferences.length,
        totalSubscribers: subscribers.length,
        activeSubscribers: subscribers.filter(s => s.active).length,
        recentComments: comments.length,
      }
    })

    return addSecurityHeaders(response)
  } catch (error) {
    console.error('Error fetching users data:', error)
    const response = NextResponse.json(
      { error: 'Failed to fetch users data' },
      { status: 500 }
    )
    return addSecurityHeaders(response)
  }
}

