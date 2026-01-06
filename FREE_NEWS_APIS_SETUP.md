# Free News APIs Setup Guide

This guide will help you set up **FREE** news APIs for CyberWatch. All these APIs have generous free tiers!

---

## 🔥 Recommended Free News APIs

### 1. **NewsAPI.org** (Best for General Tech News)
- **Free Tier**: 100 requests/day
- **Coverage**: 80,000+ sources worldwide
- **Perfect for**: Tech news, general news

#### Setup:
1. Go to: https://newsapi.org/register
2. Sign up with your email (FREE)
3. Copy your API key
4. Add to `.env.local`:
   ```
   NEWS_API_KEY=your_newsapi_key_here
   ```

#### Example Sources:
- TechCrunch
- The Verge
- Wired
- Ars Technica
- Hacker News

---

### 2. **The Guardian API** (High-Quality News)
- **Free Tier**: 5,000 requests/day
- **Coverage**: The Guardian's entire archive
- **Perfect for**: Quality journalism, tech section

#### Setup:
1. Go to: https://open-platform.theguardian.com/access/
2. Register for a free API key
3. Add to `.env.local`:
   ```
   GUARDIAN_API_KEY=your_guardian_key_here
   ```

---

### 3. **RSS Feeds** (Completely Free, No Limits!)
These are already configured in your app and work without any API keys:

#### Cybersecurity Sources:
- **The Hacker News**: https://feeds.feedburner.com/TheHackersNews
- **Krebs on Security**: https://krebsonsecurity.com/feed/
- **Bleeping Computer**: https://www.bleepingcomputer.com/feed/
- **Dark Reading**: https://www.darkreading.com/rss.xml

#### Tech Sources:
- **TechCrunch**: https://techcrunch.com/feed/
- **Ars Technica**: http://feeds.arstechnica.com/arstechnica/index
- **The Verge**: https://www.theverge.com/rss/index.xml
- **Wired**: https://www.wired.com/feed/rss

---

### 4. **Reddit API** (Free, No Key Required)
- **Free Tier**: Unlimited (with rate limiting)
- **Coverage**: r/technology, r/cybersecurity, r/netsec
- **Perfect for**: Community-driven tech news

#### Example Endpoints:
```
https://www.reddit.com/r/technology.json
https://www.reddit.com/r/cybersecurity.json
https://www.reddit.com/r/netsec.json
```

---

### 5. **Hacker News API** (Completely Free)
- **Free Tier**: Unlimited
- **Coverage**: Y Combinator's Hacker News
- **Perfect for**: Startup and tech news

#### Endpoint:
```
https://hacker-news.firebaseio.com/v0/topstories.json
```

---

## 🚀 Quick Start

### Option 1: Use RSS Feeds Only (No API Keys Needed!)
Your app is already configured to use RSS feeds. Just run:
```bash
npm run dev
```

The news will automatically load from:
- TechCrunch
- The Hacker News
- Bleeping Computer
- Krebs on Security
- And more!

### Option 2: Add NewsAPI for More Sources
1. Get your free API key from https://newsapi.org/register
2. Update `.env.local`:
   ```
   NEWS_API_KEY=your_actual_api_key_here
   ```
3. Restart your dev server

---

## 📊 Current Configuration

Your app currently uses **RSS feeds** which are:
- ✅ **100% Free**
- ✅ **No API keys required**
- ✅ **No rate limits**
- ✅ **9+ sources configured**

The RSS feeds are parsed and stored in your Supabase database, so you get:
- Fast loading
- Caching
- Search functionality
- Category filtering

---

## 🔐 Database Setup

Run this SQL in your Supabase SQL Editor:

```sql
-- Copy the contents of supabase-setup.sql
```

Or use the Supabase dashboard:
1. Go to https://supabase.com/dashboard/project/nhzysbwltyicvkhbdpah
2. Click "SQL Editor"
3. Paste the contents of `supabase-setup.sql`
4. Click "Run"

---

## 🎯 Summary

**You don't need any API keys to get started!** 

Your app already works with free RSS feeds. If you want more sources or features:

1. **NewsAPI** - 100 requests/day (good for testing)
2. **Guardian API** - 5,000 requests/day (very generous)
3. **RSS Feeds** - Unlimited (already configured!)

**Recommended**: Start with RSS feeds (already working), then add NewsAPI if you need more sources.

---

## 📝 Next Steps

1. ✅ RSS feeds are already working
2. 🔄 Run the SQL setup in Supabase (for saved articles & subscribers)
3. 🎨 Optionally add NewsAPI key for more sources
4. 🚀 Deploy to Vercel when ready!

---

## 🆘 Need Help?

- NewsAPI Docs: https://newsapi.org/docs
- Guardian API Docs: https://open-platform.theguardian.com/documentation/
- Supabase Docs: https://supabase.com/docs

Your app is ready to go! 🎉

