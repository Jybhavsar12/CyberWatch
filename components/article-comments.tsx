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

    setLoading(true)
    setError(null)
    try {
      // Note: This would need an API route to post comments
      // For now, we'll show an error message
      setError('Comments feature is temporarily disabled during migration')
      /*
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          article_url: articleUrl,
          comment: newComment.trim(),
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to post comment')
      }

      setNewComment('')
      fetchComments()
      */
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

