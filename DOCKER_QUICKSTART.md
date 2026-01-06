# Docker Quick Start Guide

Get CyberWatch running in 3 minutes with Docker!

## Prerequisites

- Docker installed ([Get Docker](https://docs.docker.com/get-docker/))
- Docker Compose installed (included with Docker Desktop)
- Supabase account ([Sign up free](https://supabase.com))

## Step 1: Clone the Repository

```bash
git clone https://github.com/Jybhavsar12/CyberWatch.git
cd CyberWatch/cyberwatch
```

## Step 2: Configure Environment

Create your environment file:

```bash
cp .env.production.example .env.production
```

Edit `.env.production` with your favorite editor:

```bash
nano .env.production
# or
vim .env.production
# or
code .env.production
```

Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### Where to find Supabase credentials:

1. Go to [supabase.com](https://supabase.com)
2. Open your project
3. Click on Settings (gear icon) → API
4. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` `secret` key → `SUPABASE_SERVICE_ROLE_KEY`

## Step 3: Start the Application

```bash
docker-compose up -d
```

That's it! 🎉

## Access Your Application

Open your browser and go to:

```
http://localhost:3000
```

## Useful Commands

### View logs
```bash
docker-compose logs -f
```

### Stop the application
```bash
docker-compose down
```

### Restart the application
```bash
docker-compose restart
```

### Check health
```bash
curl http://localhost:3000/api/health
```

### View cache statistics
```bash
curl http://localhost:3000/api/news/cache
```

## Using Makefile (Optional)

If you have `make` installed, you can use these shortcuts:

```bash
make up          # Start the application
make down        # Stop the application
make logs        # View logs
make health      # Check health
make restart     # Restart
make rebuild     # Rebuild and restart
```

## Troubleshooting

### Port 3000 already in use

Change the port in `docker-compose.yml`:

```yaml
ports:
  - "8080:3000"  # Use port 8080 instead
```

Then access at `http://localhost:8080`

### Container won't start

Check logs:
```bash
docker-compose logs
```

### Environment variables not working

Make sure `.env.production` exists and has correct values:
```bash
cat .env.production
```

### Docker not found

Install Docker Desktop:
- Mac: https://docs.docker.com/desktop/install/mac-install/
- Windows: https://docs.docker.com/desktop/install/windows-install/
- Linux: https://docs.docker.com/desktop/install/linux-install/

## Next Steps

- Read [DOCKER.md](DOCKER.md) for advanced configuration
- Check [CACHING_OPTIMIZATION.md](CACHING_OPTIMIZATION.md) for performance details
- Visit [README.md](README.md) for full documentation

## Support

Having issues? 

1. Check the logs: `docker-compose logs -f`
2. Verify environment variables: `cat .env.production`
3. Check health: `curl http://localhost:3000/api/health`
4. Open an issue: https://github.com/Jybhavsar12/CyberWatch/issues

---

**Enjoy CyberWatch!** 🚀

