'use client'

import { ArticleComments } from '@/components/article-comments'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import { formatDistanceToNow } from 'date-fns'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, Clock } from 'lucide-react'
import { useRef } from 'react'

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
  const cardRef = useRef<HTMLDivElement>(null)

  // Mouse position tracking for 3D tilt effect (desktop only)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring animations (desktop only)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only enable 3D tilt on desktop (viewport width > 1024px)
    if (!cardRef.current || window.innerWidth < 1024) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const x = (e.clientX - centerX) / (rect.width / 2)
    const y = (e.clientY - centerY) / (rect.height / 2)

    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.3 }
        }}
      >
        <Card className="flex flex-col h-full border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 transition-all duration-500 bg-white dark:bg-black group hover:shadow-2xl overflow-hidden relative"
          style={{ transform: 'translateZ(0)' }}
        >
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 dark:to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

      {article.image_url && (
        <div className="relative h-48 w-full overflow-hidden">
          <motion.img
            src={article.image_url}
            alt={article.title}
            className="object-cover w-full h-full"
            style={{
              filter: 'grayscale(100%)',
              transform: 'translateZ(20px)',
            }}
            whileHover={{
              filter: 'grayscale(0%)',
              scale: 1.1,
              transition: { duration: 0.7, ease: 'easeOut' }
            }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 dark:from-white/60 to-transparent"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Shimmer effect on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-black/20 to-transparent"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
        </div>
      )}
      <CardHeader className="space-y-3" style={{ transform: 'translateZ(30px)' }}>
        <motion.div
          className="flex items-start justify-between gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1 + 0.2 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Badge
              variant="outline"
              className={`text-xs font-medium tracking-wider transition-all duration-300 ${
                article.category === 'cybersecurity'
                  ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
                  : 'bg-white dark:bg-black text-black dark:text-white border-black/20 dark:border-white/20'
              }`}
            >
              {article.category === 'cybersecurity' ? 'SECURITY' : 'TECH'}
            </Badge>
          </motion.div>
          <div className="flex items-center gap-1 text-xs text-black/40 dark:text-white/40">
            <Clock className="h-3 w-3" />
            <span className="tracking-wide">
              {formatDistanceToNow(new Date(article.published_at), { addSuffix: true })}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          <CardTitle className="line-clamp-2 text-lg font-bold tracking-tight text-black dark:text-white leading-tight group-hover:text-black/80 dark:group-hover:text-white/80 transition-colors duration-300">
            {article.title}
          </CardTitle>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.4 }}
        >
          <CardDescription className="flex items-center gap-2 text-xs text-black/50 dark:text-white/50 tracking-wide uppercase">
            <span>{article.source}</span>
          </CardDescription>
        </motion.div>
      </CardHeader>
      <CardContent className="flex-1" style={{ transform: 'translateZ(25px)' }}>
        <motion.p
          className="text-sm text-black/60 dark:text-white/60 line-clamp-3 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.5 }}
        >
          {article.description}
        </motion.p>
        {article.tags.length > 0 && (
          <motion.div
            className="flex flex-wrap gap-2 mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1 + 0.6 }}
          >
            {article.tags.slice(0, 3).map((tag, tagIndex) => (
              <motion.div
                key={tagIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 + 0.7 + tagIndex * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Badge
                  variant="outline"
                  className="text-xs border-black/10 dark:border-white/10 text-black/50 dark:text-white/50 bg-black/5 dark:bg-white/5 font-normal transition-all duration-300 hover:border-black/30 dark:hover:border-white/30"
                >
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col gap-4 border-t border-black/5 dark:border-white/5 pt-4" style={{ transform: 'translateZ(35px)' }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1 + 0.8 }}
          className="w-full"
        >
          <Button
            asChild
            className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 font-medium tracking-wide group/btn transition-all duration-300"
            size="sm"
          >
            <motion.a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              READ MORE
              <ArrowUpRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
            </motion.a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.9 }}
          className="w-full"
        >
          <ArticleComments articleUrl={article.url} />
        </motion.div>
      </CardFooter>
    </Card>
      </motion.div>
    </motion.div>
  )
}

