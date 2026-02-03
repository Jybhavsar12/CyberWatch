'use client'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { formatDistanceToNow } from 'date-fns'
import { MessageCircle, Send, User } from 'lucide-react'
import { useSession } from 'next-auth/react'
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
  const [showComments, setShowComments] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { data: session } = useSession()
  const user = session?.user

  useEffect(() => {
    if (showComments) {
      fetchComments()
    }
  }, [showComments])

  const fetchComments = async () => {
    try {
      setError(null)
      const response = await fetch(`/api/comments?articleUrl=${encodeURIComponent(articleUrl)}`)

      if (!response.ok) {
        throw new Error('Failed to fetch comments')
      }

      const data = await response.json()
      setComments(data.comments || [])
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
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          articleUrl,
          comment: newComment.trim(),
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to post comment')
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
                className="min-h-20 resize-none border-black/20 dark:border-white/20"
                maxLength={1000}
              />
              <div className="flex items-center justify-between">
                <span className="text-xs text-black/40 dark:text-white/40">
                  {newComment.length}/1000
                </span>
                <Button
                  type="submit"
                  disabled={loading || !newComment.trim()}
                  size="sm"
                  className="bg-black dark:bg-white text-white dark:text-black"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {loading ? 'Posting...' : 'Post Comment'}
                </Button>
              </div>
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
                <p className="text-sm text-black/80 dark:text-white/80 whitespace-pre-wrap">{comment.comment}</p>
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