import { rateLimit } from '@/lib/middleware/rate-limit'
import { addSecurityHeaders } from '@/lib/middleware/security'
import { createAdminClient, createClient } from '@/lib/supabase/server'
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

    // Use admin client to fetch all users
    const adminClient = createAdminClient()

    // Fetch authenticated users from Supabase Auth (using admin API)
    const { data: { users: authUsers }, error: usersError } = await adminClient.auth.admin.listUsers()

    // Fetch user preferences
    const { data: userPreferences, error: prefsError } = await supabase
      .from('user_preferences')
      .select('*')

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

    // Combine auth users with their preferences
    const usersWithPreferences = authUsers?.map(authUser => {
      const prefs = userPreferences?.find(p => p.user_id === authUser.id)
      return {
        id: authUser.id,
        email: authUser.email,
        created_at: authUser.created_at,
        last_sign_in_at: authUser.last_sign_in_at,
        email_confirmed_at: authUser.email_confirmed_at,
        preferences: prefs || null
      }
    }) || []

    const response = NextResponse.json({
      authUsers: usersWithPreferences,
      subscribers: subscribers || [],
      recentActivity: comments || [],
      stats: {
        totalAuthUsers: usersWithPreferences.length,
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

