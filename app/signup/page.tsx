'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Newspaper, Mail, Lock, User, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error

      setSuccess(true)
    } catch (error: any) {
      setError(error.message || 'Failed to sign up')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center p-6">
        <Card className="w-full max-w-md border-black/10 dark:border-white/10 bg-white dark:bg-black">
          <CardHeader>
            <CardTitle className="text-2xl font-bold tracking-tight text-black dark:text-white">Check Your Email</CardTitle>
            <CardDescription className="text-black/60 dark:text-white/60">
              We've sent you a confirmation link to <strong>{email}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-black/60 dark:text-white/60">
              Click the link in the email to verify your account and start using CyberWatch.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => router.push('/login')}
              className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90"
            >
              GO TO LOGIN
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="relative">
            <Shield className="h-10 w-10 text-black dark:text-white" strokeWidth={1.5} />
            <Newspaper className="h-6 w-6 text-black dark:text-white absolute -bottom-1 -right-1" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white">CYBERWATCH</h1>
        </div>

        <Card className="border-black/10 dark:border-white/10 bg-white dark:bg-black">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight text-black dark:text-white">Create Account</CardTitle>
            <CardDescription className="text-black/60 dark:text-white/60">
              Join CyberWatch to get personalized tech and security intelligence
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded text-sm text-red-600 dark:text-red-400">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-black dark:text-white tracking-wide">FULL NAME</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black/40 dark:text-white/40" />
                  <Input
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="pl-10 border-black/20 dark:border-white/20 bg-white dark:bg-black text-black dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-black dark:text-white tracking-wide">EMAIL</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black/40 dark:text-white/40" />
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 border-black/20 dark:border-white/20 bg-white dark:bg-black text-black dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-black dark:text-white tracking-wide">PASSWORD</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black/40 dark:text-white/40" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="pl-10 border-black/20 dark:border-white/20 bg-white dark:bg-black text-black dark:text-white"
                  />
                </div>
                <p className="text-xs text-black/40 dark:text-white/40">Must be at least 6 characters</p>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 font-medium tracking-wide"
              >
                {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 border-t border-black/5 dark:border-white/5">
            <div className="text-sm text-center text-black/60 dark:text-white/60">
              Already have an account?{' '}
              <Link href="/login" className="text-black dark:text-white font-medium hover:underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

