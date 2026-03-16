'use client'

import { Floating, Parallax } from '@/components/animations';
import { NewsFeed } from '@/components/news-feed';
import { NewsletterSignup } from '@/components/newsletter-signup';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { GlowingEffectDemo } from '@/components/glowing-effect-demo';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Lock, Newspaper, Shield, TrendingUp, User, Zap } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useRef } from 'react';

// Lazy load the shader background for faster initial page load
const ShaderBackground = dynamic(
  () => import('@/components/ui/animated-shader-hero').then(mod => ({ default: mod.ShaderBackground })),
  { ssr: false }
);

export default function Home() {
  const { data: session } = useSession()
  const user = session?.user
  const router = useRouter()
  const heroAnimation = useScrollAnimation({ threshold: 0.2 })
  const feedAnimation = useScrollAnimation({ threshold: 0.1 })

  // Scroll-based animations
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // Transform scroll progress to various effects
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95])
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50])

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.refresh()
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-white dark:bg-black transition-colors">
      {/* Header */}
      <motion.header
        className="border-b border-black/10 dark:border-white/10 bg-white dark:bg-black sticky top-0 z-50 backdrop-blur-sm bg-white/80 dark:bg-black/80 transition-all duration-300"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex items-center justify-between animate-fade-in">
            <Link href="/" className="flex items-center gap-2 sm:gap-4 group/logo">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative transform group-hover/logo:scale-110 transition-transform duration-300">
                  <Shield className="h-7 w-7 sm:h-9 sm:w-9 text-black dark:text-white transition-transform duration-300 group-hover/logo:rotate-12" strokeWidth={1.5} />
                  <Newspaper className="h-4 w-4 sm:h-5 sm:w-5 text-black dark:text-white absolute -bottom-1 -right-1 transition-transform duration-300 group-hover/logo:-rotate-12" strokeWidth={1.5} />
                </div>
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-black dark:text-white transition-colors duration-300">CYBERWATCH</h1>
                <p className="text-[10px] sm:text-xs tracking-wider text-black/60 dark:text-white/60 uppercase transition-colors duration-300 hidden sm:block">Intelligence Platform</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
              <Link href="/" className="text-sm font-medium text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white transition-colors tracking-wide">
                HOME
              </Link>
              <Link href="/about" className="text-sm font-medium text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white transition-colors tracking-wide">
                ABOUT
              </Link>
              <ThemeToggle />
              {user ? (
                <>
                  <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 bg-black/5 dark:bg-white/5 rounded border border-black/10 dark:border-white/10">
                    <User className="h-4 w-4 text-black dark:text-white" />
                    <span className="text-xs text-black dark:text-white">{user.email}</span>
                  </div>
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    size="sm"
                    className="border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 hover:scale-105"
                  >
                    SIGN OUT
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline" size="sm" className="border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 hover:scale-105">
                      LOGIN
                    </Button>
                  </Link>
                  <Link href="/subscribe">
                    <Button size="sm" className="bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 font-medium tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-lg">
                      SUBSCRIBE
                    </Button>
                  </Link>
                </>
              )}
            </nav>

            {/* Mobile Navigation */}
            <div className="flex lg:hidden items-center gap-2">
              <ThemeToggle />
              {user ? (
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  size="sm"
                  className="border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 text-xs"
                >
                  SIGN OUT
                </Button>
              ) : (
                <Link href="/login">
                  <Button variant="outline" size="sm" className="border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 text-xs">
                    LOGIN
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section with Animated Shader Background */}
      <motion.section
        ref={heroAnimation.ref}
        className="bg-black dark:bg-white text-white dark:text-black py-16 sm:py-24 md:py-32 border-b border-white/10 dark:border-black/10 overflow-hidden relative min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] flex items-center"
        style={{
          opacity: heroOpacity,
          scale: heroScale,
          y: heroY
        }}
      >
        {/* Animated Shader Background */}
        <ShaderBackground className="dark:opacity-20" />

        {/* Floating Decorative Elements with Stagger */}
        <Floating duration={4} yOffset={15} className="absolute top-10 right-20 pointer-events-none hidden lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Shield className="h-20 w-20 text-white dark:text-black" strokeWidth={0.5} />
          </motion.div>
        </Floating>

        <Floating duration={5} yOffset={20} className="absolute bottom-10 left-20 pointer-events-none hidden lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <Lock className="h-16 w-16 text-white dark:text-black" strokeWidth={0.5} />
          </motion.div>
        </Floating>

        <Floating duration={3.5} yOffset={12} className="absolute top-1/2 right-40 pointer-events-none hidden xl:block">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <Zap className="h-14 w-14 text-white dark:text-black" strokeWidth={0.5} />
          </motion.div>
        </Floating>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              className="flex items-center gap-2 mb-4 sm:mb-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="h-px w-8 sm:w-12 bg-white/40 dark:bg-black/40"></div>
              <span className="text-[10px] sm:text-xs tracking-widest text-white/60 dark:text-black/60 uppercase">Real-Time Intelligence</span>
            </motion.div>

            {/* Title with Parallax */}
            <Parallax speed={0.5}>
              <motion.h2
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 sm:mb-10 md:mb-12 tracking-tight leading-tight"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Stay Ahead of the<br />
                <span className="bg-gradient-to-r from-white to-white/60 dark:from-black dark:to-black/60 bg-clip-text text-transparent">
                  Digital Frontier
                </span>
              </motion.h2>
            </Parallax>

            <motion.p
              className="text-base sm:text-lg md:text-xl text-white/70 dark:text-black/70 max-w-2xl leading-relaxed mt-6 sm:mt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Curated technology and cybersecurity intelligence from the world&apos;s most trusted sources.
              Real-time updates, zero noise.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-4 sm:gap-6 mt-6 sm:mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {[
                { icon: TrendingUp, label: '9+ Sources' },
                { icon: Zap, label: 'Real-Time' },
                { icon: Lock, label: 'Secure' }
              ].map((item) => (
                <motion.div
                  key={item.label}
                  className="flex items-center gap-2 group cursor-pointer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <item.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white/60 dark:text-black/60 group-hover:text-white dark:group-hover:text-black transition-colors" />
                  <span className="text-xs sm:text-sm text-white/60 dark:text-black/60 group-hover:text-white dark:group-hover:text-black transition-colors">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Main Content with Enhanced Parallax */}
      <main ref={feedAnimation.ref} className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 relative">
        {/* Multi-layered Parallax Backgrounds - Hidden on mobile for performance */}
        <Parallax speed={2} className="absolute top-40 -left-20 pointer-events-none hidden md:block">
          <motion.div
            className="w-96 h-96 bg-gradient-to-br from-purple-500/10 to-blue-500/10 dark:from-purple-500/5 dark:to-blue-500/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </Parallax>

        <Parallax speed={1.5} className="absolute top-80 right-10 pointer-events-none hidden md:block">
          <motion.div
            className="w-80 h-80 bg-gradient-to-br from-cyan-500/10 to-pink-500/10 dark:from-cyan-500/5 dark:to-pink-500/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -30, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
          />
        </Parallax>

        <motion.div
          className="mb-8 sm:mb-12 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={feedAnimation.isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <motion.div
              className="h-px w-12 sm:w-16 bg-black/20 dark:bg-white/20"
              initial={{ width: 0 }}
              animate={feedAnimation.isVisible ? { width: 64 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <h3 className="text-[10px] sm:text-xs tracking-widest text-black/40 dark:text-white/40 uppercase">Latest Intelligence</h3>
          </div>
          <motion.div
            className="h-px bg-gradient-to-r from-black/10 via-black/20 to-black/10 dark:from-white/10 dark:via-white/20 dark:to-white/10"
            initial={{ scaleX: 0 }}
            animate={feedAnimation.isVisible ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>

        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={feedAnimation.isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <NewsFeed />
        </motion.div>
      </main>

      {/* Glowing Effect Demo - Features Section */}
      <GlowingEffectDemo />

      {/* Newsletter Signup */}
      <NewsletterSignup />

      {/* Footer */}
      <footer className="border-t border-black/10 dark:border-white/10 bg-white dark:bg-black mt-12 sm:mt-16 md:mt-20">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-12">
            <div className="sm:col-span-2">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <Shield className="h-6 w-6 sm:h-7 sm:w-7 text-black dark:text-white" strokeWidth={1.5} />
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-black dark:text-white">CYBERWATCH</h3>
              </div>
              <p className="text-xs sm:text-sm text-black/60 dark:text-white/60 leading-relaxed max-w-md">
                Your trusted intelligence platform for technology and cybersecurity news,
                aggregated from leading publications worldwide.
              </p>
            </div>
            <div>
              <h4 className="text-[10px] sm:text-xs font-bold tracking-widest text-black dark:text-white mb-3 sm:mb-4 uppercase">Sources</h4>
              <ul className="text-xs sm:text-sm text-black/60 dark:text-white/60 space-y-1.5 sm:space-y-2">
                <li>TechCrunch</li>
                <li>The Hacker News</li>
                <li>Bleeping Computer</li>
                <li>Krebs on Security</li>
                <li>Ars Technica</li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] sm:text-xs font-bold tracking-widest text-black dark:text-white mb-3 sm:mb-4 uppercase">Security</h4>
              <ul className="text-xs sm:text-sm text-black/60 dark:text-white/60 space-y-1.5 sm:space-y-2">
                <li>Rate Limiting</li>
                <li>API Protection</li>
                <li>Data Encryption</li>
                <li>Secure Headers</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-black/10 dark:border-white/10 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-[10px] sm:text-xs text-black/40 dark:text-white/40 tracking-wide text-center sm:text-left">© 2026 CYBERWATCH. ALL RIGHTS RESERVED.</p>
            <div className="flex items-center gap-4 sm:gap-6">
              <Link href="/privacy" className="text-[10px] sm:text-xs text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors tracking-wide">PRIVACY</Link>
              <Link href="/terms" className="text-[10px] sm:text-xs text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors tracking-wide">TERMS</Link>
              <Link href="/about" className="text-[10px] sm:text-xs text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors tracking-wide">ABOUT</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
