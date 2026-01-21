import { rateLimit } from '@/lib/middleware/rate-limit'
import { addSecurityHeaders } from '@/lib/middleware/security'
import { sql } from '@/lib/db/neon'
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

    // Generate unsubscribe token
    const unsubscribeToken = randomBytes(32).toString('hex')

    // Insert subscriber
    try {
      await sql`
        INSERT INTO newsletter_subscribers (email, unsubscribe_token, active)
        VALUES (${email.toLowerCase()}, ${unsubscribeToken}, ${true})
      `
    } catch (error: any) {
      // Check if already subscribed (unique constraint violation)
      if (error.code === '23505') {
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

