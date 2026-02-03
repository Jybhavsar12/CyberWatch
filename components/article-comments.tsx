'use client'

import { MessageCircle } from 'lucide-react'

interface ArticleCommentsProps {
  articleUrl: string
}

export function ArticleComments({ articleUrl }: ArticleCommentsProps) {
  // Comments feature temporarily disabled during migration from Supabase to Neon
  return (
    <div className="border-t border-black/10 dark:border-white/10 pt-4">
      <div className="flex items-center gap-2 text-black/40 dark:text-white/40">
        <MessageCircle className="h-4 w-4" />
        <span className="text-xs sm:text-sm">Comments temporarily disabled during migration</span>
      </div>
    </div>
  )
}