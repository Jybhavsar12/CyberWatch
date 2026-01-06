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

  const fetchNews = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/news?category=${category}&limit=30`)
      const data = await response.json()
      setArticles(data.articles || [])
    } catch (error) {
      console.error('Error fetching news:', error)
    } finally {
      setLoading(false)
    }
  }, [category])

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
    <div className="space-y-8">
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black/40 dark:text-white/40" />
          <Input
            placeholder="Search intelligence..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="pl-11 h-12 border-black/20 dark:border-white/20 focus:border-black dark:focus:border-white bg-white dark:bg-black text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40"
          />
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleSearch}
            className="h-12 px-6 bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 font-medium tracking-wide"
          >
            SEARCH
          </Button>
          <Button
            variant="outline"
            onClick={fetchNews}
            className="h-12 px-4 border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs value={category} onValueChange={(v) => setCategory(v as 'all' | 'tech' | 'cybersecurity')}>
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-1">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-black dark:data-[state=active]:bg-white data-[state=active]:text-white dark:data-[state=active]:text-black text-black/60 dark:text-white/60 font-medium tracking-wide"
          >
            ALL
          </TabsTrigger>
          <TabsTrigger
            value="tech"
            className="data-[state=active]:bg-black dark:data-[state=active]:bg-white data-[state=active]:text-white dark:data-[state=active]:text-black text-black/60 dark:text-white/60 font-medium tracking-wide"
          >
            TECH
          </TabsTrigger>
          <TabsTrigger
            value="cybersecurity"
            className="data-[state=active]:bg-black dark:data-[state=active]:bg-white data-[state=active]:text-white dark:data-[state=active]:text-black text-black/60 dark:text-white/60 font-medium tracking-wide"
          >
            SECURITY
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Articles Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-96 bg-black/5 dark:bg-white/5 animate-pulse border border-black/10 dark:border-white/10" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <NewsCard
              key={article.id}
              article={article}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && articles.length === 0 && (
        <div className="text-center py-20 border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
          <Filter className="h-12 w-12 text-black/20 dark:text-white/20 mx-auto mb-4" />
          <p className="text-black/40 dark:text-white/40 text-sm tracking-wide">NO INTELLIGENCE FOUND</p>
          <p className="text-black/30 dark:text-white/30 text-xs mt-2">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}

