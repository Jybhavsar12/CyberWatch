#!/bin/bash

# Script to add environment variables to Vercel
# Run this script to add all required environment variables

echo "🔧 Adding environment variables to Vercel..."
echo ""

# Add NEXT_PUBLIC_SUPABASE_URL
echo "Adding NEXT_PUBLIC_SUPABASE_URL..."
echo "https://nhzysbwltyicvkhbdpah.supabase.co" | vercel env add NEXT_PUBLIC_SUPABASE_URL production

# Add NEXT_PUBLIC_SUPABASE_ANON_KEY
echo "Adding NEXT_PUBLIC_SUPABASE_ANON_KEY..."
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oenlzYndsdHlpY3ZraGJkcGFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2NjEzNDAsImV4cCI6MjA4MzIzNzM0MH0.hFnQTUOS3cMf5jqvnNBNxuhbz1nYzg3JmdqUqOliiz0" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production

# Add SUPABASE_SERVICE_ROLE_KEY
echo "Adding SUPABASE_SERVICE_ROLE_KEY..."
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oenlzYndsdHlpY3ZraGJkcGFoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzY2MTM0MCwiZXhwIjoyMDgzMjM3MzQwfQ._6M-BAUikzQ9KvL5320XLlP-lcDjhDnw0w2C4O8dws0" | vercel env add SUPABASE_SERVICE_ROLE_KEY production

# Add NEWS_API_KEY
echo "Adding NEWS_API_KEY..."
echo "56264fb7e6f5498f8e931e9bf0dd5f2a" | vercel env add NEWS_API_KEY production

# Add API_SECRET_KEY
echo "Adding API_SECRET_KEY..."
echo "your_random_secret_key_here" | vercel env add API_SECRET_KEY production

echo ""
echo "✅ All environment variables added!"
echo ""
echo "🚀 Now run: vercel --prod"

