'use client'

import { ArticleComments } from '@/components/article-comments'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import { formatDistanceToNow } from 'date-fns'
import { ArrowUpRight, Clock } from 'lucide-react'

interface NewsCardProps {
  article: {
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
  index?: number
}

export function NewsCard({ article, index = 0 }: NewsCardProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })

  return (
    <div
      ref={ref}
      className={`animate-on-scroll ${isVisible ? 'animate-fade-in-up' : ''}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Card className="flex flex-col h-full border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 transition-all duration-300 bg-white dark:bg-black group hover:shadow-xl hover:-translate-y-1 transform">
      {article.image_url && (
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={article.image_url}
            alt={article.title}
            className="object-cover w-full h-full grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 dark:from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      )}
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <Badge
            variant="outline"
            className={`text-xs font-medium tracking-wider ${
              article.category === 'cybersecurity'
                ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
                : 'bg-white dark:bg-black text-black dark:text-white border-black/20 dark:border-white/20'
            }`}
          >
            {article.category === 'cybersecurity' ? 'SECURITY' : 'TECH'}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-black/40 dark:text-white/40">
            <Clock className="h-3 w-3" />
            <span className="tracking-wide">
              {formatDistanceToNow(new Date(article.published_at), { addSuffix: true })}
            </span>
          </div>
        </div>
        <CardTitle className="line-clamp-2 text-lg font-bold tracking-tight text-black dark:text-white leading-tight group-hover:text-black/80 dark:group-hover:text-white/80 transition-colors">
          {article.title}
        </CardTitle>
        <CardDescription className="flex items-center gap-2 text-xs text-black/50 dark:text-white/50 tracking-wide uppercase">
          <span>{article.source}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-black/60 dark:text-white/60 line-clamp-3 leading-relaxed">
          {article.description}
        </p>
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {article.tags.slice(0, 3).map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs border-black/10 dark:border-white/10 text-black/50 dark:text-white/50 bg-black/5 dark:bg-white/5 font-normal"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-4 border-t border-black/5 dark:border-white/5 pt-4">
        <Button
          asChild
          className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 font-medium tracking-wide group/btn"
          size="sm"
        >
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            READ MORE
            <ArrowUpRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </a>
        </Button>

        <ArticleComments articleUrl={article.url} />
      </CardFooter>
    </Card>
    </div>
  )
}

