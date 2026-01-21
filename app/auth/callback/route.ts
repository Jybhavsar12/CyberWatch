import { NextResponse } from 'next/server'

// NextAuth handles OAuth callbacks automatically at /api/auth/callback/[provider]
// This route is kept for backward compatibility and redirects to home
export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const origin = requestUrl.origin

  // Redirect to home page
  return NextResponse.redirect(`${origin}/`)
}

