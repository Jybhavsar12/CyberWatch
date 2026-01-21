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

// Helper function to execute queries with error handling
export async function query<T = any>(
  queryText: string,
  params?: any[]
): Promise<T[]> {
  try {
    const result = await sql(queryText, params)
    return result as T[]
  } catch (error) {
    console.error('Database query error:', error)
    throw error
  }
}

// Helper function to execute a single row query
export async function queryOne<T = any>(
  queryText: string,
  params?: any[]
): Promise<T | null> {
  try {
    const result = await sql(queryText, params)
    return result[0] as T || null
  } catch (error) {
    console.error('Database query error:', error)
    throw error
  }
}

// Helper function for transactions
export async function transaction<T>(
  callback: (sql: typeof sql) => Promise<T>
): Promise<T> {
  try {
    return await callback(sql)
  } catch (error) {
    console.error('Transaction error:', error)
    throw error
  }
}

