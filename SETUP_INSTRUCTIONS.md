# 🚀 CyberWatch Setup Instructions

## ⚠️ Important: You Need to Set Up Supabase First!

The app won't run without proper Supabase configuration. Follow these steps:

## Step 1: Create a Supabase Account (Free)

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub, Google, or Email
4. It's **100% FREE** for development!

## Step 2: Create a New Project

1. Click "New Project" in the Supabase Dashboard
2. Fill in the details:
   - **Organization**: Create new or select existing
   - **Name**: `CyberWatch` (or any name you like)
   - **Database Password**: Click "Generate a password" and **SAVE IT**
   - **Region**: Choose the closest region to you
   - **Pricing Plan**: Free (default)
3. Click "Create new project"
4. Wait 2-3 minutes for the project to be ready ☕

## Step 3: Set Up the Database

1. In your Supabase project, click on **SQL Editor** in the left sidebar
2. Click "New Query"
3. Open the file `supabase/schema.sql` in this project
4. Copy **ALL** the contents
5. Paste into the Supabase SQL Editor
6. Click "Run" (or press Cmd/Ctrl + Enter)
7. You should see: ✅ "Success. No rows returned"

## Step 4: Get Your API Keys

1. In Supabase Dashboard, go to **Settings** (gear icon) > **API**
2. You'll see two important sections:

### Project URL
Copy this URL (looks like: `https://xxxxxxxxxxxxx.supabase.co`)

### API Keys
- **anon public**: Copy this key (starts with `eyJ...`)
- **service_role**: Copy this key (starts with `eyJ...`) - **Keep this secret!**

## Step 5: Configure Your Environment

1. In the `cyberwatch` folder, find the file `.env.local`
2. Open it in your text editor
3. Replace the placeholder values with your actual Supabase credentials:

```env
# Replace these with your actual values from Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# These can stay as-is for now
NEXT_PUBLIC_APP_URL=http://localhost:3000
API_SECRET_KEY=your_random_secret_key_here
```

4. **Save the file**

## Step 6: Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

## ✅ What You Should See

- Beautiful CyberWatch homepage
- News feed loading articles
- Search functionality
- Category tabs (All News, Tech, Cybersecurity)

## 🐛 Troubleshooting

### Error: "Invalid supabaseUrl"

**Problem**: You haven't configured Supabase credentials yet

**Solution**: 
1. Make sure you completed Steps 1-5 above
2. Check that `.env.local` has real values (not placeholders)
3. Restart the dev server: Stop it (Ctrl+C) and run `npm run dev` again

### Error: "Failed to fetch news"

**Problem**: Database schema not applied or connection issue

**Solution**:
1. Go back to Step 3 and run the SQL schema again
2. Check Supabase Dashboard > Database > Tables - you should see `articles`, `saved_articles`, `user_preferences`
3. Verify your API keys are correct

### News feed is empty

**Problem**: This is normal on first load! The app fetches news from RSS feeds

**Solution**:
1. Wait 10-15 seconds for the first fetch
2. Click the refresh button
3. Check browser console for any errors

### Build errors

**Problem**: TypeScript or dependency issues

**Solution**:
```bash
# Clear everything and reinstall
rm -rf .next node_modules
npm install
npm run dev
```

## 📝 Quick Reference

### Supabase Dashboard URLs
- **Main Dashboard**: https://supabase.com/dashboard
- **Your Project**: https://supabase.com/dashboard/project/YOUR_PROJECT_ID
- **SQL Editor**: https://supabase.com/dashboard/project/YOUR_PROJECT_ID/sql
- **API Settings**: https://supabase.com/dashboard/project/YOUR_PROJECT_ID/settings/api

### Important Files
- `.env.local` - Your environment variables (DO NOT commit to Git!)
- `supabase/schema.sql` - Database schema
- `app/page.tsx` - Homepage
- `components/news-feed.tsx` - Main news feed component

## 🎯 Next Steps After Setup

1. ✅ Verify the app is running
2. ✅ Test the search functionality
3. ✅ Try filtering by category
4. ✅ Read the full [README.md](./README.md)
5. ✅ Check out [DEPLOYMENT.md](./DEPLOYMENT.md) to deploy to Vercel

## 🆘 Still Having Issues?

1. Check the browser console (F12) for errors
2. Check the terminal for error messages
3. Verify all environment variables are set correctly
4. Make sure Supabase project is active (green status in dashboard)
5. Try restarting the dev server

## 🎉 Success!

Once you see the CyberWatch homepage with news articles loading, you're all set! 

The app will:
- Automatically fetch news from 9+ sources
- Update the database with new articles
- Allow you to search and filter
- Display beautiful, responsive cards

---

**Need help?** Open an issue on GitHub or check the documentation!

