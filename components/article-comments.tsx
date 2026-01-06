'use client'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { createClient } from '@/lib/supabase/client'
import { formatDistanceToNow } from 'date-fns'
import { MessageCircle, Send, User } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Comment {
  id: string
  user_name: string
  comment: string
  created_at: string
}

interface ArticleCommentsProps {
  articleUrl: string
}

export function ArticleComments({ articleUrl }: ArticleCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [showComments, setShowComments] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    checkUser()
    if (showComments) {
      fetchComments()
    }
  }, [showComments])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
  }

  const fetchComments = async () => {
    try {
      setError(null)
      const { data, error } = await supabase
        .from('article_comments')
        .select('*')
        .eq('article_url', articleUrl)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching comments:', error)
        setError(`Failed to load comments: ${error.message}`)
        return
      }
      setComments(data || [])
    } catch (error: any) {
      console.error('Error fetching comments:', error)
      setError(`Failed to load comments: ${error?.message || 'Unknown error'}`)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !user) return

    setLoading(true)
    setError(null)
    try {
      const { error } = await supabase
        .from('article_comments')
        .insert({
          article_url: articleUrl,
          user_id: user.id,
          user_name: user.email?.split('@')[0] || 'Anonymous',
          user_email: user.email,
          comment: newComment.trim(),
        })

      if (error) {
        console.error('Error posting comment:', error)
        setError(`Failed to post comment: ${error.message}`)
        return
      }

      setNewComment('')
      fetchComments()
    } catch (error: any) {
      console.error('Error posting comment:', error)
      setError(`Failed to post comment: ${error?.message || 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="border-t border-black/10 dark:border-white/10 pt-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowComments(!showComments)}
        className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
      >
        <MessageCircle className="h-4 w-4 mr-2" />
        {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
      </Button>

      {showComments && (
        <div className="mt-4 space-y-4">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-2 rounded text-sm">
              {error}
            </div>
          )}

          {user ? (
            <form onSubmit={handleSubmit} className="space-y-2">
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[80px] resize-none border-black/20 dark:border-white/20"
              />
              <Button
                type="submit"
                disabled={loading || !newComment.trim()}
                size="sm"
                className="bg-black dark:bg-white text-white dark:text-black"
              >
                <Send className="h-4 w-4 mr-2" />
                {loading ? 'Posting...' : 'Post Comment'}
              </Button>
            </form>
          ) : (
            <p className="text-sm text-black/60 dark:text-white/60">
              Please <a href="/login" className="underline">login</a> to comment
            </p>
          )}

          <div className="space-y-3">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-black/5 dark:bg-white/5 p-3 rounded border border-black/10 dark:border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-black/40 dark:text-white/40" />
                  <span className="text-sm font-medium text-black dark:text-white">{comment.user_name}</span>
                  <span className="text-xs text-black/40 dark:text-white/40">
                    {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sm text-black/80 dark:text-white/80">{comment.comment}</p>
              </div>
            ))}
            {comments.length === 0 && (
              <p className="text-sm text-black/40 dark:text-white/40 text-center py-4">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

