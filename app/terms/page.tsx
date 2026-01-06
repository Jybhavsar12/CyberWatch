import { Shield } from 'lucide-react'
import Link from 'next/link'

export default function TermsPage() {
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

      {/* Content */}
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white mb-4">Terms of Service</h1>
          <p className="text-sm text-black/60 dark:text-white/60">Last updated: January 6, 2026</p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Agreement to Terms</h2>
            <p className="text-black/80 dark:text-white/80 leading-relaxed mb-4">
              By accessing or using CyberWatch, you agree to be bound by these Terms of Service and all 
              applicable laws and regulations. If you do not agree with any of these terms, you are 
              prohibited from using or accessing this site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Use License</h2>
            <p className="text-black/80 dark:text-white/80 leading-relaxed mb-4">
              Permission is granted to temporarily access the materials on CyberWatch for personal, 
              non-commercial use only. This is the grant of a license, not a transfer of title, and 
              under this license you may not:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-black/80 dark:text-white/80">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to reverse engineer any software on CyberWatch</li>
              <li>Remove any copyright or proprietary notations</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4">User Accounts</h2>
            <p className="text-black/80 dark:text-white/80 leading-relaxed mb-4">
              When you create an account with us, you must provide accurate and complete information. 
              You are responsible for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-black/80 dark:text-white/80">
              <li>Maintaining the security of your account and password</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4">User Content</h2>
            <p className="text-black/80 dark:text-white/80 leading-relaxed mb-4">
              By posting comments or other content on CyberWatch, you grant us a non-exclusive, 
              royalty-free license to use, reproduce, and display such content. You agree that:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-black/80 dark:text-white/80">
              <li>You own or have the right to post the content</li>
              <li>Your content does not violate any laws or third-party rights</li>
              <li>Your content is not offensive, defamatory, or harmful</li>
              <li>You will not spam or post malicious content</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Prohibited Activities</h2>
            <p className="text-black/80 dark:text-white/80 leading-relaxed mb-4">
              You may not access or use the site for any purpose other than that for which we make it available. 
              Prohibited activities include:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-black/80 dark:text-white/80">
              <li>Attempting to bypass any security features</li>
              <li>Engaging in any automated use of the system</li>
              <li>Harassing, abusing, or harming other users</li>
              <li>Uploading viruses or malicious code</li>
              <li>Collecting user information without consent</li>
              <li>Using the service for any illegal purpose</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Content Disclaimer</h2>
            <p className="text-black/80 dark:text-white/80 leading-relaxed mb-4">
              CyberWatch aggregates news from various third-party sources. We do not:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-black/80 dark:text-white/80">
              <li>Guarantee the accuracy or completeness of any content</li>
              <li>Endorse any views expressed in the articles</li>
              <li>Take responsibility for content from external sources</li>
              <li>Warrant that the service will be uninterrupted or error-free</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Intellectual Property</h2>
            <p className="text-black/80 dark:text-white/80 leading-relaxed mb-4">
              The service and its original content (excluding user-generated content and third-party articles) 
              are and will remain the exclusive property of CyberWatch. Our trademarks and trade dress may not 
              be used without our prior written consent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Limitation of Liability</h2>
            <p className="text-black/80 dark:text-white/80 leading-relaxed mb-4">
              In no event shall CyberWatch or its suppliers be liable for any damages (including, without 
              limitation, damages for loss of data or profit, or due to business interruption) arising out 
              of the use or inability to use the materials on CyberWatch.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Termination</h2>
            <p className="text-black/80 dark:text-white/80 leading-relaxed mb-4">
              We may terminate or suspend your account and access to the service immediately, without prior 
              notice or liability, for any reason, including if you breach these Terms of Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Changes to Terms</h2>
            <p className="text-black/80 dark:text-white/80 leading-relaxed mb-4">
              We reserve the right to modify these terms at any time. We will notify users of any material 
              changes by posting the new Terms of Service on this page and updating the "Last updated" date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Contact Information</h2>
            <p className="text-black/80 dark:text-white/80 leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p className="text-black/80 dark:text-white/80 leading-relaxed">
              <strong>Email:</strong> legal@cyberwatch.com
            </p>
          </section>
        </div>

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

