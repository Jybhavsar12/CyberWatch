'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Filter, RefreshCw, Search } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { NewsCard } from './news-card'

interface Article {
  id: string
  title: string
  description: string | null
  url: string
  image_url: string | null
  source: string
  category: string
  published_at: string
  tags: string[]
}

export function NewsFeed() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState<'all' | 'tech' | 'cybersecurity'>('all')
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchNews = useCallback(async (forceRefresh = false) => {
    setLoading(true)
    setError(null)
    try {
      // Add cache-busting parameter when force refreshing
      const cacheBuster = forceRefresh ? `&t=${Date.now()}` : ''
      const response = await fetch(`/api/news?category=${category}&limit=30${cacheBuster}`, {
        // Force no-cache when refreshing
        cache: forceRefresh ? 'no-store' : 'default'
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Fetched articles:', data.articles?.length || 0)
      setArticles(data.articles || [])
    } catch (error) {
      console.error('Error fetching news:', error)
      setError(error instanceof Error ? error.message : 'Failed to load news')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [category])

  const handleRefresh = useCallback(async () => {
    setRefreshing(true)
    await fetchNews(true)
  }, [fetchNews])

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) {
      fetchNews()
      return
    }

    setLoading(true)
    try {
      const response = await fetch(
        `/api/news/search?q=${encodeURIComponent(searchQuery)}&category=${category}`
      )
      const data = await response.json()
      setArticles(data.articles || [])
    } catch (error) {
      console.error('Error searching news:', error)
    } finally {
      setLoading(false)
    }
  }, [searchQuery, category, fetchNews])

  useEffect(() => {
    fetchNews()
  }, [fetchNews])

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black/40 dark:text-white/40" />
          <Input
            placeholder="Search intelligence..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="pl-10 sm:pl-11 h-10 sm:h-12 text-sm sm:text-base border-black/20 dark:border-white/20 focus:border-black dark:focus:border-white bg-white dark:bg-black text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40"
          />
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleSearch}
            className="h-10 sm:h-12 px-4 sm:px-6 text-xs sm:text-sm bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 font-medium tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-lg flex-1 sm:flex-none"
          >
            SEARCH
          </Button>
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={refreshing}
            className="h-10 sm:h-12 px-3 sm:px-4 border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 hover:scale-105 disabled:opacity-50"
            title="Refresh news"
          >
            <RefreshCw className={`h-4 w-4 transition-transform duration-300 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs value={category} onValueChange={(v) => setCategory(v as 'all' | 'tech' | 'cybersecurity')}>
        <TabsList className="grid w-full sm:w-auto sm:inline-grid grid-cols-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-1">
          <TabsTrigger
            value="all"
            className="text-xs sm:text-sm data-[state=active]:bg-black dark:data-[state=active]:bg-white data-[state=active]:text-white dark:data-[state=active]:text-black text-black/60 dark:text-white/60 font-medium tracking-wide"
          >
            ALL
          </TabsTrigger>
          <TabsTrigger
            value="tech"
            className="text-xs sm:text-sm data-[state=active]:bg-black dark:data-[state=active]:bg-white data-[state=active]:text-white dark:data-[state=active]:text-black text-black/60 dark:text-white/60 font-medium tracking-wide"
          >
            TECH
          </TabsTrigger>
          <TabsTrigger
            value="cybersecurity"
            className="text-xs sm:text-sm data-[state=active]:bg-black dark:data-[state=active]:bg-white data-[state=active]:text-white dark:data-[state=active]:text-black text-black/60 dark:text-white/60 font-medium tracking-wide"
          >
            SECURITY
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Articles Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-80 sm:h-96 bg-black/5 dark:bg-white/5 animate-shimmer border border-black/10 dark:border-white/10 rounded-lg overflow-hidden"
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {articles.map((article, index) => (
            <NewsCard
              key={article.id}
              article={article}
              index={index % 3}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && articles.length === 0 && (
        <div className="text-center py-12 sm:py-20 border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 rounded-lg">
          <Filter className="h-10 w-10 sm:h-12 sm:w-12 text-black/20 dark:text-white/20 mx-auto mb-3 sm:mb-4" />
          <p className="text-black/40 dark:text-white/40 text-xs sm:text-sm tracking-wide">NO INTELLIGENCE FOUND</p>
          <p className="text-black/30 dark:text-white/30 text-xs mt-2">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}

