import { NextResponse } from 'next/server'
import { createUser, getUserByEmail } from '@/lib/auth'
import { addSecurityHeaders } from '@/lib/middleware/security'

export async function POST(request: Request) {
  try {
    const { email, password, fullName } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Create user
    const user = await createUser(email, password, fullName)

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.full_name,
      },
    })

    return addSecurityHeaders(response)
  } catch (error) {
    console.error('Signup error:', error)
    const response = NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    )
    return addSecurityHeaders(response)
  }
}

