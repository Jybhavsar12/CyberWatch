import { Shield, Zap, Lock, TrendingUp, Globe, Users } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <header className="border-b border-black/10 dark:border-white/10 bg-white dark:bg-black sticky top-0 z-50">
        <div className="container mx-auto px-6 py-5">
          <Link href="/" className="flex items-center gap-3">
            <Shield className="h-7 w-7 text-black dark:text-white" strokeWidth={1.5} />
            <h1 className="text-xl font-bold tracking-tight text-black dark:text-white">CYBERWATCH</h1>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-black dark:bg-white text-white dark:text-black py-20 border-b border-white/10 dark:border-black/10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px w-12 bg-white/40 dark:bg-black/40"></div>
              <span className="text-xs tracking-widest text-white/60 dark:text-black/60 uppercase">About Us</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
              Your Trusted Source for<br />Tech & Security Intelligence
            </h2>
            <p className="text-lg text-white/70 dark:text-black/70 max-w-2xl leading-relaxed">
              CyberWatch is a curated intelligence platform that aggregates the latest technology and 
              cybersecurity news from the world's most trusted sources, delivering real-time updates 
              with zero noise.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-6">Our Mission</h2>
          <p className="text-black/80 dark:text-white/80 leading-relaxed text-lg mb-4">
            In an era of information overload, staying informed about technology and cybersecurity 
            developments shouldn't be overwhelming. CyberWatch was built to solve this problem by 
            providing a single, reliable platform for curated tech and security news.
          </p>
          <p className="text-black/80 dark:text-white/80 leading-relaxed text-lg">
            We believe that access to quality information is essential for professionals, enthusiasts, 
            and anyone who wants to stay ahead in the rapidly evolving digital landscape.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-8">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-black/10 dark:border-white/10 p-6 rounded-lg">
              <Zap className="h-8 w-8 text-black dark:text-white mb-4" />
              <h3 className="text-xl font-bold text-black dark:text-white mb-2">Real-Time Updates</h3>
              <p className="text-black/70 dark:text-white/70">
                Get the latest news as it happens from over 9 trusted sources, updated continuously 
                throughout the day.
              </p>
            </div>

            <div className="border border-black/10 dark:border-white/10 p-6 rounded-lg">
              <Globe className="h-8 w-8 text-black dark:text-white mb-4" />
              <h3 className="text-xl font-bold text-black dark:text-white mb-2">Curated Content</h3>
              <p className="text-black/70 dark:text-white/70">
                Every article is sourced from reputable publications known for their accuracy and 
                expertise in tech and cybersecurity.
              </p>
            </div>

            <div className="border border-black/10 dark:border-white/10 p-6 rounded-lg">
              <Lock className="h-8 w-8 text-black dark:text-white mb-4" />
              <h3 className="text-xl font-bold text-black dark:text-white mb-2">Privacy-Focused</h3>
              <p className="text-black/70 dark:text-white/70">
                We respect your privacy. No tracking, no ads, no data selling. Just clean, 
                focused news delivery.
              </p>
            </div>

            <div className="border border-black/10 dark:border-white/10 p-6 rounded-lg">
              <Users className="h-8 w-8 text-black dark:text-white mb-4" />
              <h3 className="text-xl font-bold text-black dark:text-white mb-2">Community Driven</h3>
              <p className="text-black/70 dark:text-white/70">
                Engage with other readers through comments, share insights, and build knowledge 
                together.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-6">Our Sources</h2>
          <p className="text-black/80 dark:text-white/80 leading-relaxed mb-6">
            We aggregate news from leading publications that have established themselves as 
            authoritative voices in technology and cybersecurity:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 bg-black dark:bg-white rounded-full"></div>
                <span className="text-black/80 dark:text-white/80">TechCrunch</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 bg-black dark:bg-white rounded-full"></div>
                <span className="text-black/80 dark:text-white/80">The Hacker News</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 bg-black dark:bg-white rounded-full"></div>
                <span className="text-black/80 dark:text-white/80">Bleeping Computer</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 bg-black dark:bg-white rounded-full"></div>
                <span className="text-black/80 dark:text-white/80">Krebs on Security</span>
              </li>
            </ul>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 bg-black dark:bg-white rounded-full"></div>
                <span className="text-black/80 dark:text-white/80">Ars Technica</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 bg-black dark:bg-white rounded-full"></div>
                <span className="text-black/80 dark:text-white/80">The Verge</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 bg-black dark:bg-white rounded-full"></div>
                <span className="text-black/80 dark:text-white/80">Wired</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 bg-black dark:bg-white rounded-full"></div>
                <span className="text-black/80 dark:text-white/80">And more...</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-16 bg-black/5 dark:bg-white/5 p-8 rounded-lg border border-black/10 dark:border-white/10">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-6">Why CyberWatch?</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <TrendingUp className="h-6 w-6 text-black dark:text-white mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-black dark:text-white mb-1">Stay Informed</h3>
                <p className="text-black/70 dark:text-white/70">
                  Keep up with the fast-paced world of technology and cybersecurity without spending 
                  hours browsing multiple websites.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Shield className="h-6 w-6 text-black dark:text-white mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-black dark:text-white mb-1">Trusted Sources</h3>
                <p className="text-black/70 dark:text-white/70">
                  Every article comes from verified, reputable sources with a track record of 
                  accurate reporting.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-12 pt-8 border-t border-black/10 dark:border-white/10">
          <Link 
            href="/" 
            className="text-sm text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  )
}

