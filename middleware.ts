import { NextResponse, type NextRequest } from 'next/server'

// NextAuth handles session management automatically
// This middleware is kept for future custom logic if needed
export async function middleware(request: NextRequest) {
  // For now, just pass through all requests
  // NextAuth handles authentication at /api/auth/*
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

