import { rateLimit } from '@/lib/middleware/rate-limit'
import { addSecurityHeaders } from '@/lib/middleware/security'
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Rate limiting
  const rateLimitResult = rateLimit(request, 10, 60000)
  if (!rateLimitResult.success) {
    return rateLimitResult.response
  }

  try {
    const supabase = await createClient()

    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized - Please sign in to access this page' },
        { status: 401 }
      )
    }

    // Check if user is admin (whitelist check)
    const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(email => email.trim().toLowerCase()) || []

    if (!adminEmails.includes(user.email?.toLowerCase() || '')) {
      return NextResponse.json(
        { error: 'Forbidden - Admin access only' },
        { status: 403 }
      )
    }

    // Fetch authenticated users from auth.users (metadata only, not sensitive data)
    const { data: authUsers, error: usersError } = await supabase
      .from('user_preferences')
      .select('*')
      .order('created_at', { ascending: false })

    // Fetch newsletter subscribers
    const { data: subscribers, error: subscribersError } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .order('subscribed_at', { ascending: false })

    // Fetch article comments to get user activity
    const { data: comments, error: commentsError } = await supabase
      .from('article_comments')
      .select('user_id, user_name, user_email, created_at')
      .order('created_at', { ascending: false })
      .limit(100)

    const response = NextResponse.json({
      authUsers: authUsers || [],
      subscribers: subscribers || [],
      recentActivity: comments || [],
      stats: {
        totalAuthUsers: authUsers?.length || 0,
        totalSubscribers: subscribers?.length || 0,
        activeSubscribers: subscribers?.filter(s => s.active).length || 0,
        recentComments: comments?.length || 0,
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

