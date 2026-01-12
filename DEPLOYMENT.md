# 🚀 CyberWatch Deployment Guide

## Quick Deploy to Vercel (Recommended)

### Option 1: Vercel Dashboard (Easiest - 5 minutes)

1. **Go to [vercel.com](https://vercel.com)** and sign in with GitHub

2. **Click "Add New Project"**

3. **Import your repository**: `Jybhavsar12/CyberWatch`

4. **Configure Project Settings**:
   - **Framework Preset**: Next.js ✅ (auto-detected)
   - **Root Directory**: `cyberwatch`
   - **Build Command**: `pnpm run build`
   - **Install Command**: `pnpm install`
   - **Output Directory**: `.next` (default)

5. **Add Environment Variables**:
   Click "Environment Variables" and add these:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://nhzysbwltyicvkhbdpah.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oenlzYndsdHlpY3ZraGJkcGFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2NjEzNDAsImV4cCI6MjA4MzIzNzM0MH0.hFnQTUOS3cMf5jqvnNBNxuhbz1nYzg3JmdqUqOliiz0
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oenlzYndsdHlpY3ZraGJkcGFoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzY2MTM0MCwiZXhwIjoyMDgzMjM3MzQwfQ._6M-BAUikzQ9KvL5320XLlP-lcDjhDnw0w2C4O8dws0
   NEWS_API_KEY=56264fb7e6f5498f8e931e9bf0dd5f2a
   API_SECRET_KEY=your_random_secret_key_here
   NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
   ```

   **Note**: Update `NEXT_PUBLIC_APP_URL` after deployment with your actual Vercel URL

6. **Click "Deploy"** 🚀

7. **Wait 2-3 minutes** for the build to complete

8. **Done!** Your app will be live at `https://your-app.vercel.app`

---

### Option 2: Vercel CLI (For Advanced Users)

#### Step 1: Commit Your Changes

```bash
cd cyberwatch
git add .
git commit -m "Prepare for deployment"
git push origin main
```

#### Step 2: Login to Vercel

```bash
vercel login
```

#### Step 3: Deploy

```bash
# Deploy to preview
vercel

# Or deploy directly to production
vercel --prod
```

The CLI will guide you through:
- Linking to your Vercel account
- Setting up the project
- Configuring environment variables

---

## 📋 Pre-Deployment Checklist

Before deploying, make sure:

- ✅ **Supabase is set up** with the correct database schema
- ✅ **Environment variables are ready** (see above)
- ✅ **Build works locally**: Run `pnpm run build` to test
- ✅ **Git changes are committed** and pushed to GitHub
- ✅ **API keys are valid** (NEWS_API_KEY, Supabase keys)

---

## 🔧 Post-Deployment Steps

### 1. Update Supabase Redirect URLs

Go to your Supabase dashboard → Authentication → URL Configuration:

Add your Vercel URL to:
- **Site URL**: `https://your-app.vercel.app`
- **Redirect URLs**: 
  - `https://your-app.vercel.app/auth/callback`
  - `https://your-app.vercel.app`

### 2. Update Environment Variables

In Vercel dashboard, update:
```env
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### 3. Test Your Deployment

- ✅ Visit your app URL
- ✅ Test login/signup functionality
- ✅ Check news feed loads correctly
- ✅ Verify saved articles work

---

## 🐛 Troubleshooting

### Build Fails

**Error**: "Module not found" or dependency issues
**Solution**: 
```bash
rm -rf node_modules .next
pnpm install
pnpm run build
```

### Environment Variables Not Working

**Solution**: 
- Check they're added in Vercel dashboard
- Redeploy after adding variables
- Make sure `NEXT_PUBLIC_` prefix is used for client-side variables

### Supabase Connection Issues

**Solution**:
- Verify Supabase URL and keys are correct
- Check Supabase project is not paused
- Add Vercel domain to Supabase allowed domains

### Slow Build Times

**Solution**:
- Vercel automatically caches dependencies
- First build: ~3-5 minutes
- Subsequent builds: ~1-2 minutes

---

## 🔄 Continuous Deployment

Once set up, Vercel automatically deploys:
- ✅ **Every push to `main`** → Production deployment
- ✅ **Every pull request** → Preview deployment
- ✅ **Instant rollbacks** if needed

---

## 📊 Monitoring

After deployment, monitor your app:
- **Vercel Dashboard**: Analytics, logs, performance
- **Supabase Dashboard**: Database usage, auth metrics
- **Vercel Logs**: Real-time application logs

---

## 🎉 You're Done!

Your CyberWatch app is now live! Share your URL and enjoy your cybersecurity news platform.

**Need help?** Check:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Supabase Docs](https://supabase.com/docs)

