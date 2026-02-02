import { neon } from '@neondatabase/serverless'

// Lazy initialization of Neon SQL client
let _sql: ReturnType<typeof neon> | null = null

export function getSQL() {
  if (!_sql) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is not set')
    }
    _sql = neon(process.env.DATABASE_URL)
  }
  return _sql
}

// Export the SQL client as a function
export const sql = (...args: Parameters<ReturnType<typeof neon>>) => getSQL()(...args)

