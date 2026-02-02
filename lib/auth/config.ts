import { sql } from '@/lib/db/neon'
import bcrypt from 'bcryptjs'
import { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'

// Only include Google provider if credentials are set
const providers: any[] = [
  Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const email = credentials.email as string
        const password = credentials.password as string

        // Find user in database
        const users = await sql`
          SELECT * FROM users WHERE email = ${email.toLowerCase()}
        `

        const user = users[0]

        if (!user) {
          return null
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password_hash)

        if (!isValidPassword) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.full_name,
        }
      },
    }),
]

// Add Google provider only if credentials are configured
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  )
}

export const authConfig: NextAuthConfig = {
  providers,
  callbacks: {
    async signIn({ user, account, profile }) {
      // Handle Google OAuth sign-in
      if (account?.provider === 'google' && profile?.email) {
        try {
          // Check if user exists
          const existingUsers = await sql`
            SELECT * FROM users WHERE email = ${profile.email.toLowerCase()}
          `

          if (existingUsers.length === 0) {
            // Create new user for Google OAuth
            await sql`
              INSERT INTO users (email, full_name, password_hash)
              VALUES (
                ${profile.email.toLowerCase()},
                ${profile.name || ''},
                ${''} -- No password for OAuth users
              )
            `
          }

          return true
        } catch (error) {
          console.error('Error during Google sign-in:', error)
          return false
        }
      }

      return true
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }

      // Store provider info
      if (account) {
        token.provider = account.provider
      }

      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
      }

      return session
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
}

