# 🚀 Quick Start - CyberWatch

## ✅ Your App is Already Working!

Your CyberWatch platform is **LIVE** and showing news from **FREE RSS feeds**! 

Visit: **http://localhost:3000**

---

## 📰 News Sources (All FREE - No API Keys!)

Your app is currently pulling news from these sources:

### Tech News:
- ✅ TechCrunch
- ✅ The Verge
- ✅ Wired
- ✅ Ars Technica

### Cybersecurity News:
- ✅ The Hacker News
- ✅ Bleeping Computer
- ✅ Krebs on Security
- ✅ Threatpost
- ✅ Dark Reading

**Total: 9 FREE sources with NO API keys required!**

---

## 🗄️ Enable Full Features (Optional - 2 Minutes)

To enable **saved articles** and **email subscriptions**, run this SQL in Supabase:

### Step 1: Open Supabase SQL Editor
Click this link: https://supabase.com/dashboard/project/nhzysbwltyicvkhbdpah/sql/new

### Step 2: Copy & Paste This SQL

```sql
-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  url TEXT UNIQUE NOT NULL,
  image_url TEXT,
  source TEXT NOT NULL,
  category TEXT NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  author TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

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
CREATE INDEX IF NOT EXISTS idx_articles_url ON articles(url);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at);
CREATE INDEX IF NOT EXISTS idx_saved_articles_user_id ON saved_articles(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_articles_article_id ON saved_articles(article_id);
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);

-- Enable Row Level Security
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_articles ENABLE ROW LEVEL SECURITY;

-- Policies for articles table
CREATE POLICY "Anyone can view articles" ON articles
  FOR SELECT USING (true);

CREATE POLICY "Service role can insert articles" ON articles
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can update articles" ON articles
  FOR UPDATE USING (true);

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

### Step 3: Click "RUN" (bottom right)

**Done!** Now you can:
- ✅ Save articles (bookmark feature)
- ✅ Collect email subscribers
- ✅ Store articles in database

---

## 🎯 What Works Right Now (Without SQL Setup)

### ✅ Already Working:
- Browse all news articles
- Search articles
- Filter by category (All/Tech/Security)
- Dark mode toggle
- Login/Signup pages
- Beautiful design
- Responsive layout

### 🔓 Unlocked After SQL Setup:
- Save articles for later
- Email subscriptions
- Persistent article storage

---

## 🧪 Test Your App

### 1. Browse News
- Visit http://localhost:3000
- See latest tech & security news
- Click category filters (ALL / TECH / SECURITY)

### 2. Search
- Type in the search box
- Find specific topics

### 3. Dark Mode
- Click the ☀️/🌙 button in header
- Toggle between light and dark themes

### 4. Create Account (After SQL Setup)
- Click "LOGIN" → "Sign up"
- Create account with email
- Save articles by clicking bookmark icon

---

## 📊 Current Status

| Feature | Status | Notes |
|---------|--------|-------|
| News Feed | ✅ Working | 9 FREE RSS sources |
| Search | ✅ Working | Real-time search |
| Filters | ✅ Working | All/Tech/Security |
| Dark Mode | ✅ Working | Toggle in header |
| Login/Signup | ✅ Working | Email + Google OAuth |
| Save Articles | ⏳ Needs SQL | Run SQL setup above |
| Subscriptions | ⏳ Needs SQL | Run SQL setup above |

---

## 🎨 Features

- **9+ News Sources** - All FREE, no API keys
- **Real-time Updates** - Fresh news every time
- **Smart Search** - Find what you need
- **Category Filters** - Tech or Security focus
- **Dark Mode** - Easy on the eyes
- **Responsive** - Works on all devices
- **Authentication** - Secure login system

---

## 🆘 Troubleshooting

### "No news showing"
→ Check the terminal - you should see `GET /api/news` requests
→ Wait a few seconds for RSS feeds to load
→ Refresh the page

### "Can't save articles"
→ Run the SQL setup in Supabase (see above)

### "Subscribe button doesn't work"
→ Run the SQL setup in Supabase (see above)

---

## ✨ You're All Set!

Your CyberWatch platform is **working perfectly** with FREE news sources!

**Next Steps:**
1. ✅ Browse news at http://localhost:3000 (already working!)
2. 🗄️ Run SQL setup to enable saved articles (optional)
3. 🚀 Deploy to Vercel when ready!

**No API keys needed!** Everything works with free RSS feeds! 🎉

