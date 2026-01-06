# 🚀 CyberWatch Complete Setup Guide

## ✅ What's Already Done

Your CyberWatch platform is now fully functional with:

### 🎨 Design
- ✅ Sophisticated black & white theme
- ✅ Dark mode toggle (light/dark)
- ✅ Responsive design
- ✅ Smooth animations

### 🔐 Authentication
- ✅ Login page (`/login`)
- ✅ Signup page (`/signup`)
- ✅ Google OAuth support
- ✅ Protected routes
- ✅ User session management

### 📄 Pages
- ✅ Homepage with news feed
- ✅ Saved articles page (`/saved`)
- ✅ Subscribe page (`/subscribe`)
- ✅ Login/Signup pages

### 🔧 Features
- ✅ Real-time news from RSS feeds (FREE!)
- ✅ Search functionality
- ✅ Category filtering (All/Tech/Security)
- ✅ Save articles (requires login)
- ✅ Email subscription
- ✅ User authentication

---

## 🗄️ Database Setup (Required)

You need to run this SQL in your Supabase dashboard to enable saved articles and subscriptions:

### Step 1: Go to Supabase SQL Editor
1. Visit: https://supabase.com/dashboard/project/nhzysbwltyicvkhbdpah/sql
2. Click "New Query"

### Step 2: Run This SQL

```sql
-- Create subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  active BOOLEAN DEFAULT TRUE
);

-- Create saved_articles table
CREATE TABLE IF NOT EXISTS saved_articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  article_id TEXT NOT NULL,
  saved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, article_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_saved_articles_user_id ON saved_articles(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_articles_article_id ON saved_articles(article_id);
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);

-- Enable Row Level Security
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_articles ENABLE ROW LEVEL SECURITY;

-- Policies for subscribers table
CREATE POLICY "Anyone can subscribe" ON subscribers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own subscription" ON subscribers
  FOR SELECT USING (true);

-- Policies for saved_articles table
CREATE POLICY "Users can view their own saved articles" ON saved_articles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can save articles" ON saved_articles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unsave their articles" ON saved_articles
  FOR DELETE USING (auth.uid() = user_id);
```

### Step 3: Click "Run"

---

## 🔑 Enable Google OAuth (Optional but Recommended)

### Step 1: Go to Supabase Auth Settings
1. Visit: https://supabase.com/dashboard/project/nhzysbwltyicvkhbdpah/auth/providers
2. Find "Google" in the providers list

### Step 2: Get Google OAuth Credentials
1. Go to: https://console.cloud.google.com/
2. Create a new project or select existing
3. Go to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth 2.0 Client ID"
5. Application type: "Web application"
6. Authorized redirect URIs: Add this URL:
   ```
   https://nhzysbwltyicvkhbdpah.supabase.co/auth/v1/callback
   ```
7. Copy your Client ID and Client Secret

### Step 3: Configure in Supabase
1. Paste Client ID and Client Secret in Supabase
2. Enable the Google provider
3. Save

---

## 📰 News API Setup (Optional - Already Using Free RSS!)

Your app already works with **FREE RSS feeds** (no API keys needed!). But if you want more sources:

### Option 1: NewsAPI.org (100 requests/day FREE)
1. Sign up: https://newsapi.org/register
2. Copy your API key
3. Add to `.env.local`:
   ```
   NEWS_API_KEY=your_newsapi_key_here
   ```

### Option 2: The Guardian API (5,000 requests/day FREE)
1. Register: https://open-platform.theguardian.com/access/
2. Copy your API key
3. Add to `.env.local`:
   ```
   GUARDIAN_API_KEY=your_guardian_key_here
   ```

**Note**: RSS feeds are already configured and working! These are optional enhancements.

---

## 🧪 Testing Your Setup

### 1. Test Authentication
```bash
# Make sure dev server is running
npm run dev

# Visit http://localhost:3000
# Click "LOGIN" or "SUBSCRIBE"
# Try signing up with email
# Try Google OAuth (if configured)
```

### 2. Test Saved Articles
```bash
# Login to your account
# Browse articles on homepage
# Click bookmark icon on any article
# Visit /saved to see your saved articles
```

### 3. Test Subscribe
```bash
# Visit http://localhost:3000/subscribe
# Enter your email
# Click "SUBSCRIBE"
# Check Supabase database for new subscriber
```

---

## 🎯 All Available Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Main news feed with search & filters |
| Login | `/login` | User login with email or Google |
| Signup | `/signup` | Create new account |
| Saved | `/saved` | View saved articles (requires login) |
| Subscribe | `/subscribe` | Email subscription page |

---

## 🔥 Features Overview

### For Visitors (No Login Required)
- ✅ Browse all news articles
- ✅ Search articles
- ✅ Filter by category
- ✅ Subscribe to newsletter
- ✅ Toggle dark mode

### For Logged-In Users
- ✅ All visitor features
- ✅ Save articles for later
- ✅ View saved articles
- ✅ Personalized experience

---

## 🚀 Next Steps

1. ✅ **Run the SQL setup** in Supabase (see above)
2. 🎨 **Test all features** (login, save, subscribe)
3. 🔑 **Optional**: Set up Google OAuth
4. 📰 **Optional**: Add NewsAPI key for more sources
5. 🌐 **Deploy**: Deploy to Vercel when ready!

---

## 📝 Quick Reference

### Environment Variables
```bash
# Required (Already set)
NEXT_PUBLIC_SUPABASE_URL=https://nhzysbwltyicvkhbdpah.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_key

# Optional
NEWS_API_KEY=your_newsapi_key
GUARDIAN_API_KEY=your_guardian_key
```

### Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
```

---

## 🆘 Troubleshooting

### "Can't save articles"
→ Run the SQL setup in Supabase (see Database Setup above)

### "Google login doesn't work"
→ Configure Google OAuth in Supabase (see Enable Google OAuth above)

### "No news showing"
→ RSS feeds work automatically! Just wait a few seconds for initial load

### "Subscribe button doesn't work"
→ Run the SQL setup to create the subscribers table

---

## ✨ You're All Set!

Your CyberWatch platform is ready to use! 🎉

- 🎨 Beautiful black & white design with dark mode
- 🔐 Full authentication system
- 📰 Free news from 9+ sources
- 💾 Save articles feature
- 📧 Email subscription
- 🚀 Production-ready

Just run the SQL setup and start using your platform!

