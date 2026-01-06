# 🚀 Deployment Guide

This guide will walk you through deploying CyberWatch to production using GitHub and Vercel.

## Prerequisites

- GitHub account
- Vercel account (free tier available)
- Supabase project set up

## Step-by-Step Deployment

### 1. Prepare Your Repository

Ensure your `.gitignore` is properly configured to exclude sensitive files:

```
node_modules/
.next/
.env*.local
.env
.vercel
```

### 2. Push to GitHub

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: CyberWatch platform"

# Create main branch
git branch -M main

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/cyberwatch.git

# Push to GitHub
git push -u origin main
```

### 3. Deploy to Vercel

#### Option A: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

5. Add Environment Variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   API_SECRET_KEY=generate_random_secret
   ```

6. Click "Deploy"

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts and add environment variables when asked
```

### 4. Configure Custom Domain (Optional)

1. In Vercel Dashboard, go to your project
2. Navigate to Settings > Domains
3. Add your custom domain
4. Update DNS records as instructed:
   - Add A record or CNAME record
   - Wait for DNS propagation (can take up to 48 hours)

### 5. Set Up Continuous Deployment

Vercel automatically sets up CI/CD:
- Every push to `main` triggers a production deployment
- Pull requests create preview deployments
- Automatic rollbacks available

### 6. Configure Supabase for Production

1. Go to Supabase Dashboard
2. Navigate to Authentication > URL Configuration
3. Add your Vercel domain to allowed redirect URLs:
   ```
   https://your-domain.vercel.app/**
   ```

4. Update CORS settings if needed

### 7. Monitor Your Deployment

- **Vercel Analytics**: Enable in project settings
- **Error Tracking**: Check deployment logs
- **Performance**: Monitor Core Web Vitals

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes |
| `NEXT_PUBLIC_APP_URL` | Your app's URL | Yes |
| `API_SECRET_KEY` | Secret for API protection | Recommended |
| `NEWS_API_KEY` | NewsAPI key (optional) | No |
| `GUARDIAN_API_KEY` | Guardian API key (optional) | No |

## Post-Deployment Checklist

- [ ] Verify all environment variables are set
- [ ] Test authentication flow
- [ ] Check news feed is loading
- [ ] Verify search functionality
- [ ] Test on mobile devices
- [ ] Check security headers
- [ ] Monitor error logs
- [ ] Set up custom domain (if applicable)
- [ ] Enable Vercel Analytics
- [ ] Configure monitoring/alerts

## Troubleshooting

### Build Fails

- Check build logs in Vercel dashboard
- Verify all dependencies are in `package.json`
- Ensure TypeScript has no errors: `npm run build` locally

### Environment Variables Not Working

- Redeploy after adding new variables
- Check variable names match exactly
- Ensure `NEXT_PUBLIC_` prefix for client-side variables

### Database Connection Issues

- Verify Supabase URL and keys
- Check Supabase project is active
- Ensure RLS policies are correct

### CORS Errors

- Add your domain to Supabase allowed origins
- Check API route CORS configuration

## Updating Your Deployment

```bash
# Make changes to your code
git add .
git commit -m "Your commit message"
git push origin main

# Vercel automatically deploys the changes
```

## Rollback

If something goes wrong:

1. Go to Vercel Dashboard
2. Navigate to Deployments
3. Find a previous working deployment
4. Click "Promote to Production"

## Security Best Practices

- Never commit `.env.local` to Git
- Rotate API keys regularly
- Use Vercel's environment variable encryption
- Enable Vercel's password protection for preview deployments
- Monitor deployment logs for suspicious activity

## Support

For deployment issues:
- Check [Vercel Documentation](https://vercel.com/docs)
- Visit [Supabase Documentation](https://supabase.com/docs)
- Open an issue on GitHub

---

🎉 Congratulations! Your CyberWatch platform is now live!

