# Docker Deployment Guide

This guide explains how to run CyberWatch using Docker for a consistent, portable, and environment-friendly deployment.

## Prerequisites

- Docker installed (version 20.10 or higher)
- Docker Compose installed (version 2.0 or higher)
- Supabase account and credentials

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Jybhavsar12/CyberWatch.git
cd CyberWatch/cyberwatch
```

### 2. Configure Environment Variables

Create a `.env.production` file from the example:

```bash
cp .env.production.example .env.production
```

Edit `.env.production` and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### 3. Build and Run with Docker Compose

```bash
docker-compose up -d
```

The application will be available at `http://localhost:3000`

## Docker Commands

### Build the Image

```bash
docker build -t cyberwatch:latest .
```

### Run the Container

```bash
docker run -d \
  --name cyberwatch \
  -p 3000:3000 \
  --env-file .env.production \
  cyberwatch:latest
```

### Using Docker Compose

**Start the application:**
```bash
docker-compose up -d
```

**Stop the application:**
```bash
docker-compose down
```

**View logs:**
```bash
docker-compose logs -f cyberwatch
```

**Restart the application:**
```bash
docker-compose restart
```

**Rebuild and restart:**
```bash
docker-compose up -d --build
```

## Container Management

### View Running Containers

```bash
docker ps
```

### View Logs

```bash
docker logs cyberwatch-app
docker logs -f cyberwatch-app  # Follow logs
```

### Execute Commands in Container

```bash
docker exec -it cyberwatch-app sh
```

### Stop Container

```bash
docker stop cyberwatch-app
```

### Remove Container

```bash
docker rm cyberwatch-app
```

### Remove Image

```bash
docker rmi cyberwatch:latest
```

## Health Checks

The container includes automatic health checks that run every 30 seconds.

**Check container health:**
```bash
docker inspect --format='{{.State.Health.Status}}' cyberwatch-app
```

**Manual health check:**
```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-06T12:00:00.000Z",
  "uptime": 3600,
  "environment": "production",
  "version": "1.0.0"
}
```

## Production Deployment

### Environment Variables

Required environment variables for production:

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (keep secret!)

### Port Configuration

By default, the application runs on port 3000. To change:

**In docker-compose.yml:**
```yaml
ports:
  - "8080:3000"  # External:Internal
```

**Or with docker run:**
```bash
docker run -p 8080:3000 cyberwatch:latest
```

### Resource Limits

Add resource limits in docker-compose.yml:

```yaml
services:
  cyberwatch:
    # ... other config
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
```

## Multi-Stage Build Benefits

The Dockerfile uses a multi-stage build for optimization:

1. **deps stage**: Installs production dependencies only
2. **builder stage**: Builds the Next.js application
3. **runner stage**: Creates minimal production image

**Benefits:**
- Smaller image size (~150MB vs ~1GB)
- Faster deployment
- Better security (no build tools in production)
- Optimized layer caching

## Security Features

1. **Non-root user**: Application runs as `nextjs` user (UID 1001)
2. **Minimal base image**: Uses Alpine Linux for smaller attack surface
3. **No development dependencies**: Only production dependencies included
4. **Health checks**: Automatic container health monitoring
5. **Environment isolation**: Secrets managed via environment variables

## Troubleshooting

### Container won't start

Check logs:
```bash
docker-compose logs cyberwatch
```

### Port already in use

Change the port in docker-compose.yml or stop the conflicting service:
```bash
lsof -i :3000
```

### Build fails

Clear Docker cache and rebuild:
```bash
docker-compose down
docker system prune -a
docker-compose up -d --build
```

### Environment variables not working

Ensure `.env.production` exists and is properly formatted:
```bash
cat .env.production
```

### Out of memory

Increase Docker memory limit in Docker Desktop settings or add resource limits.

## Updating the Application

```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose up -d --build
```

## Backup and Restore

### Backup logs

```bash
docker cp cyberwatch-app:/app/logs ./backup-logs
```

### Export container

```bash
docker export cyberwatch-app > cyberwatch-backup.tar
```

## Performance Optimization

The Docker setup includes:

- Multi-stage builds for smaller images
- Layer caching for faster builds
- Standalone Next.js output
- Health checks for reliability
- Resource limits for stability

## Support

For issues or questions:
- GitHub Issues: https://github.com/Jybhavsar12/CyberWatch/issues
- Check logs: `docker-compose logs -f`
- Health endpoint: `http://localhost:3000/api/health`

