import { rateLimit } from '@/lib/middleware/rate-limit'
import { addSecurityHeaders } from '@/lib/middleware/security'
import { createClient } from '@/lib/supabase/server'
import { searchQuerySchema } from '@/lib/validations/article'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Rate limiting
  const rateLimitResult = rateLimit(request, 20, 60000)
  if (!rateLimitResult.success) {
    return rateLimitResult.response
  }

  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const category = searchParams.get('category') as 'tech' | 'cybersecurity' | 'all'

    // Validate input
    const validation = searchQuerySchema.safeParse({ query, category })
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid search query', details: validation.error.issues },
        { status: 400 }
      )
    }

    const supabase = await createClient()
    
    let queryBuilder = supabase
      .from('articles')
      .select('*')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .order('published_at', { ascending: false })
      .limit(50)

    if (category && category !== 'all') {
      queryBuilder = queryBuilder.eq('category', category)
    }

    const { data: articles, error } = await queryBuilder

    if (error) {
      throw error
    }

    const response = NextResponse.json({ articles, count: articles?.length || 0 })
    return addSecurityHeaders(response)
  } catch (error) {
    console.error('Error searching news:', error)
    const response = NextResponse.json(
      { error: 'Failed to search news' },
      { status: 500 }
    )
    return addSecurityHeaders(response)
  }
}

