'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Newspaper, Mail, Check, Zap, Lock, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function SubscribePage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const supabase = createClient()

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Insert into subscribers table
      const { error } = await supabase
        .from('subscribers')
        .insert([{ email, subscribed_at: new Date().toISOString() }])

      if (error) {
        if (error.code === '23505') {
          throw new Error('This email is already subscribed!')
        }
        throw error
      }

      setSuccess(true)
      setEmail('')
    } catch (error: any) {
      setError(error.message || 'Failed to subscribe')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <header className="border-b border-black/10 dark:border-white/10 bg-white dark:bg-black">
        <div className="container mx-auto px-6 py-5">
          <Link href="/" className="flex items-center gap-4 w-fit">
            <div className="relative">
              <Shield className="h-9 w-9 text-black dark:text-white" strokeWidth={1.5} />
              <Newspaper className="h-5 w-5 text-black dark:text-white absolute -bottom-1 -right-1" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-black dark:text-white">CYBERWATCH</h1>
              <p className="text-xs tracking-wider text-black/60 dark:text-white/60 uppercase">Intelligence Platform</p>
            </div>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-px w-12 bg-black/40 dark:bg-white/40"></div>
              <span className="text-xs tracking-widest text-black/60 dark:text-white/60 uppercase">Premium Intelligence</span>
              <div className="h-px w-12 bg-black/40 dark:bg-white/40"></div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-black dark:text-white">
              Never Miss a Beat
            </h1>
            <p className="text-lg text-black/70 dark:text-white/70 max-w-2xl mx-auto">
              Get daily curated tech and cybersecurity intelligence delivered straight to your inbox.
              Stay informed, stay ahead.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="border-black/10 dark:border-white/10 bg-white dark:bg-black">
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-black dark:text-white mb-3" />
                <CardTitle className="text-black dark:text-white">Daily Digest</CardTitle>
                <CardDescription className="text-black/60 dark:text-white/60">
                  Curated news from 9+ trusted sources, delivered every morning
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-black/10 dark:border-white/10 bg-white dark:bg-black">
              <CardHeader>
                <Zap className="h-8 w-8 text-black dark:text-white mb-3" />
                <CardTitle className="text-black dark:text-white">Breaking Alerts</CardTitle>
                <CardDescription className="text-black/60 dark:text-white/60">
                  Real-time notifications for critical security threats
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-black/10 dark:border-white/10 bg-white dark:bg-black">
              <CardHeader>
                <Lock className="h-8 w-8 text-black dark:text-white mb-3" />
                <CardTitle className="text-black dark:text-white">Privacy First</CardTitle>
                <CardDescription className="text-black/60 dark:text-white/60">
                  No spam, no tracking. Unsubscribe anytime with one click
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Subscribe Form */}
          <Card className="border-black/10 dark:border-white/10 bg-black dark:bg-white">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-white dark:text-black">
                {success ? 'You\'re Subscribed!' : 'Subscribe Now'}
              </CardTitle>
              <CardDescription className="text-white/70 dark:text-black/70">
                {success 
                  ? 'Check your inbox for a confirmation email' 
                  : 'Join 10,000+ professionals staying ahead of the curve'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {success ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 dark:bg-black/10 mb-4">
                    <Check className="h-8 w-8 text-white dark:text-black" />
                  </div>
                  <p className="text-white/80 dark:text-black/80 mb-6">
                    Welcome to CyberWatch! You'll receive your first digest tomorrow morning.
                  </p>
                  <Link href="/">
                    <Button variant="outline" className="border-white/20 dark:border-black/20 text-white dark:text-black hover:bg-white/10 dark:hover:bg-black/10">
                      BACK TO HOME
                    </Button>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-500/20 border border-red-500/50 rounded text-sm text-white dark:text-black">
                      {error}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40 dark:text-black/40" />
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="pl-10 h-12 border-white/20 dark:border-black/20 bg-white/10 dark:bg-black/10 text-white dark:text-black placeholder:text-white/40 dark:placeholder:text-black/40"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="h-12 px-8 bg-white dark:bg-black text-black dark:text-white hover:bg-white/90 dark:hover:bg-black/90 font-medium tracking-wide"
                    >
                      {loading ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
                    </Button>
                  </div>

                  <p className="text-xs text-white/60 dark:text-black/60 text-center">
                    By subscribing, you agree to receive emails from CyberWatch. Unsubscribe anytime.
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

