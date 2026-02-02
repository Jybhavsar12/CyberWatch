import { sql } from '@/lib/db/neon'
import bcrypt from 'bcryptjs'
import NextAuth from 'next-auth'
import { authConfig } from './config'

// Create auth instance for NextAuth v5
export const { auth, handlers, signIn, signOut } = NextAuth(authConfig)

export async function getSession() {
  return await auth()
}

export async function getCurrentUser() {
  const session = await getSession()
  return session?.user
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Unauthorized')
  }
  return user
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10)
}

export async function createUser(email: string, password: string, fullName?: string) {
  const passwordHash = await hashPassword(password)
  
  const result = await sql`
    INSERT INTO users (email, password_hash, full_name)
    VALUES (${email.toLowerCase()}, ${passwordHash}, ${fullName || ''})
    RETURNING id, email, full_name, created_at
  `
  
  return result[0]
}

export async function getUserByEmail(email: string) {
  const users = await sql`
    SELECT id, email, full_name, created_at
    FROM users
    WHERE email = ${email.toLowerCase()}
  `
  
  return users[0] || null
}

export async function getUserById(id: string) {
  const users = await sql`
    SELECT id, email, full_name, created_at
    FROM users
    WHERE id = ${id}
  `
  
  return users[0] || null
}

