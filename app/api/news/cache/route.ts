import { addSecurityHeaders } from '@/lib/middleware/security'
import { clearCache, getCacheStats } from '@/lib/services/news-cache'
import { NextRequest, NextResponse } from 'next/server'

// GET cache statistics
export async function GET(request: NextRequest) {
  try {
    const stats = getCacheStats()
    const response = NextResponse.json({ 
      stats,
      message: 'Cache statistics retrieved successfully'
    })
    return addSecurityHeaders(response)
  } catch (error) {
    console.error('Error getting cache stats:', error)
    const response = NextResponse.json(
      { error: 'Failed to get cache statistics' },
      { status: 500 }
    )
    return addSecurityHeaders(response)
  }
}

// DELETE to clear cache
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') as 'tech' | 'cybersecurity' | 'all' | null

    if (category) {
      clearCache(category)
    } else {
      clearCache()
    }

    const response = NextResponse.json({ 
      message: category ? `Cache cleared for ${category}` : 'All cache cleared',
      success: true
    })
    return addSecurityHeaders(response)
  } catch (error) {
    console.error('Error clearing cache:', error)
    const response = NextResponse.json(
      { error: 'Failed to clear cache' },
      { status: 500 }
    )
    return addSecurityHeaders(response)
  }
}

