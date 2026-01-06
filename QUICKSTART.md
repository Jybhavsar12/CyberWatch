# ⚡ Quick Start Guide

Get CyberWatch up and running in 5 minutes!

## 🚀 Fast Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase (2 minutes)

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click "New Project"
3. Fill in:
   - **Name**: CyberWatch
   - **Database Password**: (generate a strong password)
   - **Region**: Choose closest to you
4. Wait for project to be ready (~2 minutes)

### 3. Configure Database

1. In Supabase Dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `supabase/schema.sql`
4. Paste and click "Run"
5. You should see "Success. No rows returned"

### 4. Get API Keys

1. In Supabase Dashboard, go to **Settings** > **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (starts with `eyJ...`)
   - **service_role** key (starts with `eyJ...`)

### 5. Configure Environment

1. Copy the example env file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
   ```

### 6. Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## ✅ Verify Everything Works

You should see:
- ✅ CyberWatch homepage with header
- ✅ News feed loading (may take a few seconds)
- ✅ Search bar functional
- ✅ Category tabs (All News, Tech, Cybersecurity)

## 🎯 Next Steps

### Enable Authentication (Optional)

1. In Supabase Dashboard, go to **Authentication** > **Providers**
2. Enable Email provider (enabled by default)
3. Enable OAuth providers (Google, GitHub, etc.)
4. Configure redirect URLs:
   ```
   http://localhost:3000/**
   ```

### Add More News Sources

Edit `lib/services/news-aggregator.ts` to add more RSS feeds:

```typescript
const RSS_FEEDS = {
  tech: [
    { url: 'https://your-feed.com/rss', name: 'Your Source' },
    // ... existing feeds
  ],
}
```

### Customize Styling

- Edit `app/globals.css` for global styles
- Modify `app/page.tsx` for homepage layout
- Update `components/news-card.tsx` for article cards

## 🐛 Troubleshooting

### News not loading?

**Problem**: Articles not appearing

**Solution**:
1. Check browser console for errors
2. Verify Supabase credentials in `.env.local`
3. Ensure database schema was applied correctly
4. Check network tab for API errors

### Build errors?

**Problem**: `npm run build` fails

**Solution**:
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Supabase connection issues?

**Problem**: "Invalid API key" or connection errors

**Solution**:
1. Double-check `.env.local` values
2. Ensure no extra spaces in environment variables
3. Restart dev server after changing `.env.local`
4. Verify Supabase project is active

### CORS errors?

**Problem**: CORS policy blocking requests

**Solution**:
1. In Supabase Dashboard, go to **Settings** > **API**
2. Add `http://localhost:3000` to allowed origins
3. Restart dev server

## 📚 Learn More

- [Full Documentation](./README.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [Security Documentation](./SECURITY.md)

## 🆘 Need Help?

- Check the [README](./README.md) for detailed documentation
- Open an issue on GitHub
- Review Supabase logs in Dashboard

## 🎨 Customization Ideas

1. **Add more categories**: Modify database schema and UI
2. **Email notifications**: Set up Supabase Edge Functions
3. **User profiles**: Add user settings page
4. **Bookmarking**: Already built-in, just add UI
5. **Dark mode**: Implement theme toggle
6. **Analytics**: Add Vercel Analytics or Google Analytics

---

Happy coding! 🚀

