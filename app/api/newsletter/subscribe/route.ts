import { rateLimit } from '@/lib/middleware/rate-limit'
import { addSecurityHeaders } from '@/lib/middleware/security'
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { randomBytes } from 'crypto'

export async function POST(request: NextRequest) {
  // Rate limiting
  const rateLimitResult = rateLimit(request, 5, 60000) // 5 requests per minute
  if (!rateLimitResult.success) {
    return rateLimitResult.response
  }

  try {
    const { email } = await request.json()

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    const supabase = await createClient()
    
    // Generate unsubscribe token
    const unsubscribeToken = randomBytes(32).toString('hex')

    // Insert subscriber
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email: email.toLowerCase(),
        unsubscribe_token: unsubscribeToken,
        active: true,
      })

    if (error) {
      // Check if already subscribed
      if (error.code === '23505') { // Unique violation
        return NextResponse.json(
          { error: 'This email is already subscribed' },
          { status: 400 }
        )
      }
      throw error
    }

    const response = NextResponse.json({ 
      message: 'Successfully subscribed to newsletter',
      success: true 
    })
    return addSecurityHeaders(response)
  } catch (error) {
    console.error('Error subscribing to newsletter:', error)
    const response = NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    )
    return addSecurityHeaders(response)
  }
}

