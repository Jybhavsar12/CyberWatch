'use client'

import { NewsFeed } from '@/components/news-feed';
import { NewsletterSignup } from '@/components/newsletter-signup';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { createClient } from '@/lib/supabase/client';
import { Lock, Newspaper, Shield, TrendingUp, User, Zap } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()
  const heroAnimation = useScrollAnimation({ threshold: 0.2 })
  const feedAnimation = useScrollAnimation({ threshold: 0.1 })

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.refresh()
  }

  useEffect(() => {
    checkUser()
  }, [checkUser])

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors">
      {/* Header */}
      <header className="border-b border-black/10 dark:border-white/10 bg-white dark:bg-black sticky top-0 z-50 backdrop-blur-sm bg-white/80 dark:bg-black/80 transition-all duration-300">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between animate-fade-in">
            <Link href="/" className="flex items-center gap-4 group/logo">
              <div className="flex items-center gap-3">
                <div className="relative transform group-hover/logo:scale-110 transition-transform duration-300">
                  <Shield className="h-9 w-9 text-black dark:text-white transition-transform duration-300 group-hover/logo:rotate-12" strokeWidth={1.5} />
                  <Newspaper className="h-5 w-5 text-black dark:text-white absolute -bottom-1 -right-1 transition-transform duration-300 group-hover/logo:-rotate-12" strokeWidth={1.5} />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-black dark:text-white transition-colors duration-300">CYBERWATCH</h1>
                <p className="text-xs tracking-wider text-black/60 dark:text-white/60 uppercase transition-colors duration-300">Intelligence Platform</p>
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white transition-colors tracking-wide">
                HOME
              </Link>
              <Link href="/about" className="text-sm font-medium text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white transition-colors tracking-wide">
                ABOUT
              </Link>
              <ThemeToggle />
              {user ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-black/5 dark:bg-white/5 rounded border border-black/10 dark:border-white/10">
                    <User className="h-4 w-4 text-black dark:text-white" />
                    <span className="text-xs text-black dark:text-white">{user.email}</span>
                  </div>
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    className="border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 hover:scale-105"
                  >
                    SIGN OUT
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline" className="border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 hover:scale-105">
                      LOGIN
                    </Button>
                  </Link>
                  <Link href="/subscribe">
                    <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 font-medium tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-lg">
                      SUBSCRIBE
                    </Button>
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        ref={heroAnimation.ref}
        className="bg-black dark:bg-white text-white dark:text-black py-20 border-b border-white/10 dark:border-black/10 overflow-hidden"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <div className={`flex items-center gap-2 mb-6 animate-on-scroll ${heroAnimation.isVisible ? 'animate-slide-in-left' : ''}`}>
              <div className="h-px w-12 bg-white/40 dark:bg-black/40"></div>
              <span className="text-xs tracking-widest text-white/60 dark:text-black/60 uppercase">Real-Time Intelligence</span>
            </div>
            <h2 className={`text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight animate-on-scroll ${heroAnimation.isVisible ? 'animate-fade-in-up animation-delay-100' : ''}`}>
              Stay Ahead of the<br />Digital Frontier
            </h2>
            <p className={`text-lg text-white/70 dark:text-black/70 max-w-2xl leading-relaxed animate-on-scroll ${heroAnimation.isVisible ? 'animate-fade-in-up animation-delay-200' : ''}`}>
              Curated technology and cybersecurity intelligence from the world's most trusted sources.
              Real-time updates, zero noise.
            </p>
            <div className={`flex items-center gap-6 mt-10 animate-on-scroll ${heroAnimation.isVisible ? 'animate-fade-in-up animation-delay-300' : ''}`}>
              <div className="flex items-center gap-2 hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-5 w-5 text-white/60 dark:text-black/60" />
                <span className="text-sm text-white/60 dark:text-black/60">9+ Sources</span>
              </div>
              <div className="flex items-center gap-2 hover:scale-110 transition-transform duration-300">
                <Zap className="h-5 w-5 text-white/60 dark:text-black/60" />
                <span className="text-sm text-white/60 dark:text-black/60">Real-Time</span>
              </div>
              <div className="flex items-center gap-2 hover:scale-110 transition-transform duration-300">
                <Lock className="h-5 w-5 text-white/60 dark:text-black/60" />
                <span className="text-sm text-white/60 dark:text-black/60">Secure</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main ref={feedAnimation.ref} className="container mx-auto px-6 py-12">
        <div className={`mb-8 animate-on-scroll ${feedAnimation.isVisible ? 'animate-fade-in-up' : ''}`}>
          <h3 className="text-xs tracking-widest text-black/40 dark:text-white/40 uppercase mb-2">Latest Intelligence</h3>
          <div className="h-px bg-black/10 dark:bg-white/10"></div>
        </div>
        <NewsFeed />
      </main>

      {/* Newsletter Signup */}
      <NewsletterSignup />

      {/* Footer */}
      <footer className="border-t border-black/10 dark:border-white/10 bg-white dark:bg-black mt-20">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-7 w-7 text-black dark:text-white" strokeWidth={1.5} />
                <h3 className="text-xl font-bold tracking-tight text-black dark:text-white">CYBERWATCH</h3>
              </div>
              <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed max-w-md">
                Your trusted intelligence platform for technology and cybersecurity news,
                aggregated from leading publications worldwide.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-widest text-black dark:text-white mb-4 uppercase">Sources</h4>
              <ul className="text-sm text-black/60 dark:text-white/60 space-y-2">
                <li>TechCrunch</li>
                <li>The Hacker News</li>
                <li>Bleeping Computer</li>
                <li>Krebs on Security</li>
                <li>Ars Technica</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-widest text-black dark:text-white mb-4 uppercase">Security</h4>
              <ul className="text-sm text-black/60 dark:text-white/60 space-y-2">
                <li>Rate Limiting</li>
                <li>API Protection</li>
                <li>Data Encryption</li>
                <li>Secure Headers</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-black/10 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-black/40 dark:text-white/40 tracking-wide">© 2026 CYBERWATCH. ALL RIGHTS RESERVED.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-xs text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors tracking-wide">PRIVACY</Link>
              <Link href="/terms" className="text-xs text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors tracking-wide">TERMS</Link>
              <Link href="/about" className="text-xs text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors tracking-wide">ABOUT</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
