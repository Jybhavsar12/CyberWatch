export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      articles: {
        Row: {
          id: string
          title: string
          description: string | null
          content: string | null
          url: string
          image_url: string | null
          source: string
          category: 'tech' | 'cybersecurity' | 'both'
          published_at: string
          created_at: string
          updated_at: string
          author: string | null
          tags: string[]
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          content?: string | null
          url: string
          image_url?: string | null
          source: string
          category: 'tech' | 'cybersecurity' | 'both'
          published_at: string
          created_at?: string
          updated_at?: string
          author?: string | null
          tags?: string[]
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          content?: string | null
          url?: string
          image_url?: string | null
          source?: string
          category?: 'tech' | 'cybersecurity' | 'both'
          published_at?: string
          created_at?: string
          updated_at?: string
          author?: string | null
          tags?: string[]
        }
      }
      saved_articles: {
        Row: {
          id: string
          user_id: string
          article_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          article_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          article_id?: string
          created_at?: string
        }
      }
      user_preferences: {
        Row: {
          id: string
          user_id: string
          categories: string[]
          notification_enabled: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          categories?: string[]
          notification_enabled?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          categories?: string[]
          notification_enabled?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

