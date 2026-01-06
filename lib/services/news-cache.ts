import { NewsItem } from './news-aggregator'

interface CacheEntry {
  data: NewsItem[]
  timestamp: number
  category: 'tech' | 'cybersecurity' | 'all'
}

// In-memory cache with 8-hour TTL
const CACHE_TTL = 8 * 60 * 60 * 1000 // 8 hours in milliseconds
const cache = new Map<string, CacheEntry>()

export function getCachedNews(category: 'tech' | 'cybersecurity' | 'all'): NewsItem[] | null {
  const cacheKey = `news_${category}`
  const cached = cache.get(cacheKey)

  if (!cached) {
    return null
  }

  const now = Date.now()
  const age = now - cached.timestamp

  // Check if cache is still valid (less than 8 hours old)
  if (age < CACHE_TTL) {
    console.log(`Cache hit for ${category} - Age: ${Math.round(age / 1000 / 60)} minutes`)
    return cached.data
  }

  // Cache expired, remove it
  console.log(`Cache expired for ${category} - Age: ${Math.round(age / 1000 / 60)} minutes`)
  cache.delete(cacheKey)
  return null
}

export function setCachedNews(category: 'tech' | 'cybersecurity' | 'all', data: NewsItem[]): void {
  const cacheKey = `news_${category}`
  cache.set(cacheKey, {
    data,
    timestamp: Date.now(),
    category,
  })
  console.log(`Cache set for ${category} - ${data.length} articles`)
}

export function clearCache(category?: 'tech' | 'cybersecurity' | 'all'): void {
  if (category) {
    const cacheKey = `news_${category}`
    cache.delete(cacheKey)
    console.log(`Cache cleared for ${category}`)
  } else {
    cache.clear()
    console.log('All cache cleared')
  }
}

export function getCacheStats() {
  const stats: Record<string, { age: number; count: number }> = {}
  
  cache.forEach((entry, key) => {
    const age = Date.now() - entry.timestamp
    stats[key] = {
      age: Math.round(age / 1000 / 60), // age in minutes
      count: entry.data.length,
    }
  })

  return stats
}

