import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { rateLimit } from '@/lib/middleware/rate-limit'
import { addSecurityHeaders } from '@/lib/middleware/security'

export async function GET(request: NextRequest) {
  const rateLimitResult = rateLimit(request, 30, 60000)
  if (!rateLimitResult.success) {
    return rateLimitResult.response
  }

  try {
    const supabase = await createClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: savedArticles, error } = await supabase
      .from('saved_articles')
      .select('*, articles(*)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error

    const response = NextResponse.json({ savedArticles })
    return addSecurityHeaders(response)
  } catch (error) {
    console.error('Error fetching saved articles:', error)
    const response = NextResponse.json(
      { error: 'Failed to fetch saved articles' },
      { status: 500 }
    )
    return addSecurityHeaders(response)
  }
}

export async function POST(request: NextRequest) {
  const rateLimitResult = rateLimit(request, 10, 60000)
  if (!rateLimitResult.success) {
    return rateLimitResult.response
  }

  try {
    const supabase = await createClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { articleId } = body

    const { data, error } = await supabase
      .from('saved_articles')
      .insert({ user_id: user.id, article_id: articleId })
      .select()
      .single()

    if (error) throw error

    const response = NextResponse.json({ savedArticle: data })
    return addSecurityHeaders(response)
  } catch (error) {
    console.error('Error saving article:', error)
    const response = NextResponse.json(
      { error: 'Failed to save article' },
      { status: 500 }
    )
    return addSecurityHeaders(response)
  }
}

export async function DELETE(request: NextRequest) {
  const rateLimitResult = rateLimit(request, 10, 60000)
  if (!rateLimitResult.success) {
    return rateLimitResult.response
  }

  try {
    const supabase = await createClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const articleId = searchParams.get('articleId')

    const { error } = await supabase
      .from('saved_articles')
      .delete()
      .eq('user_id', user.id)
      .eq('article_id', articleId)

    if (error) throw error

    const response = NextResponse.json({ success: true })
    return addSecurityHeaders(response)
  } catch (error) {
    console.error('Error deleting saved article:', error)
    const response = NextResponse.json(
      { error: 'Failed to delete saved article' },
      { status: 500 }
    )
    return addSecurityHeaders(response)
  }
}

