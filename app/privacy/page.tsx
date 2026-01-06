import { Shield } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white mb-4">Privacy Policy</h1>
          <p className="text-sm text-black/60 dark:text-white/60">Last updated: January 6, 2026</p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Introduction</h2>
            <p className="text-black/80 dark:text-white/80 leading-relaxed mb-4">
              Welcome to CyberWatch. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy will inform you about how we look after your personal data when you visit our 
              website and tell you about your privacy rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Information We Collect</h2>
            <p className="text-black/80 dark:text-white/80 leading-relaxed mb-4">
              We collect and process the following types of information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-black/80 dark:text-white/80">
              <li><strong>Account Information:</strong> Email address when you create an account</li>
              <li><strong>Newsletter Subscriptions:</strong> Email address when you subscribe to our newsletter</li>
              <li><strong>Comments:</strong> Username, email, and comment content when you post comments</li>
              <li><strong>Usage Data:</strong> Information about how you use our website</li>
              <li><strong>Technical Data:</strong> IP address, browser type, and device information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4">How We Use Your Information</h2>
            <p className="text-black/80 dark:text-white/80 leading-relaxed mb-4">
              We use your information for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-black/80 dark:text-white/80">
              <li>To provide and maintain our service</li>
              <li>To send you newsletters and updates (if subscribed)</li>
              <li>To enable you to comment on articles</li>
              <li>To improve our website and user experience</li>
              <li>To detect and prevent fraud or abuse</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Data Security</h2>
            <p className="text-black/80 dark:text-white/80 leading-relaxed mb-4">
              We implement appropriate security measures to protect your personal data, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-black/80 dark:text-white/80">
              <li>Encryption of data in transit and at rest</li>
              <li>Secure authentication via Supabase</li>
              <li>Row-level security policies on our database</li>
              <li>Regular security audits and updates</li>
              <li>Rate limiting to prevent abuse</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Your Rights</h2>
            <p className="text-black/80 dark:text-white/80 leading-relaxed mb-4">
              You have the following rights regarding your personal data:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-black/80 dark:text-white/80">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Request correction of inaccurate data</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data</li>
              <li><strong>Unsubscribe:</strong> Opt-out of newsletter emails at any time</li>
              <li><strong>Data Portability:</strong> Request transfer of your data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Cookies</h2>
            <p className="text-black/80 dark:text-white/80 leading-relaxed mb-4">
              We use essential cookies to maintain your session and preferences. We do not use tracking or 
              advertising cookies. You can control cookies through your browser settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Third-Party Services</h2>
            <p className="text-black/80 dark:text-white/80 leading-relaxed mb-4">
              We use the following third-party services:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-black/80 dark:text-white/80">
              <li><strong>Supabase:</strong> For authentication and database hosting</li>
              <li><strong>News APIs:</strong> To aggregate news content</li>
            </ul>
            <p className="text-black/80 dark:text-white/80 leading-relaxed mt-4">
              These services have their own privacy policies and we encourage you to review them.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Changes to This Policy</h2>
            <p className="text-black/80 dark:text-white/80 leading-relaxed mb-4">
              We may update this privacy policy from time to time. We will notify you of any changes by 
              posting the new policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Contact Us</h2>
            <p className="text-black/80 dark:text-white/80 leading-relaxed mb-4">
              If you have any questions about this privacy policy or our data practices, please contact us at:
            </p>
            <p className="text-black/80 dark:text-white/80 leading-relaxed">
              <strong>Email:</strong> privacy@cyberwatch.com
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

