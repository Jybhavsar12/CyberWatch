'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import { Mail } from 'lucide-react'
import { useState } from 'react'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: 'Successfully subscribed to newsletter!' })
        setEmail('')
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to subscribe' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Something went wrong. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div ref={ref} className="bg-black dark:bg-white text-white dark:text-black py-16 border-y border-white/10 dark:border-black/10">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className={`flex items-center justify-center gap-2 mb-4 animate-on-scroll ${isVisible ? 'animate-fade-in-up' : ''}`}>
            <Mail className="h-6 w-6 text-white/60 dark:text-black/60" />
            <h3 className="text-2xl font-bold tracking-tight">STAY INFORMED</h3>
          </div>
          <p className={`text-white/70 dark:text-black/70 mb-8 animate-on-scroll ${isVisible ? 'animate-fade-in-up animation-delay-100' : ''}`}>
            Get the latest tech and cybersecurity news delivered to your inbox. No spam, unsubscribe anytime.
          </p>

          <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-3 max-w-md mx-auto animate-on-scroll ${isVisible ? 'animate-fade-in-up animation-delay-200' : ''}`}>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white/10 dark:bg-black/10 border-white/20 dark:border-black/20 text-white dark:text-black placeholder:text-white/40 dark:placeholder:text-black/40 transition-all duration-300 focus:scale-105"
            />
            <Button
              type="submit"
              disabled={loading}
              className="bg-white dark:bg-black text-black dark:text-white hover:bg-white/90 dark:hover:bg-black/90 font-medium tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              {loading ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
            </Button>
          </form>

          {message && (
            <p className={`mt-4 text-sm animate-fade-in ${message.type === 'success' ? 'text-green-400 dark:text-green-600' : 'text-red-400 dark:text-red-600'}`}>
              {message.text}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

