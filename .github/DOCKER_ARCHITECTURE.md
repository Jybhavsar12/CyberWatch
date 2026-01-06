# Docker Architecture

## Container Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Docker Container                         │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              CyberWatch Application                    │  │
│  │                                                        │  │
│  │  ┌──────────────────────────────────────────────┐    │  │
│  │  │         Next.js Server (Port 3000)           │    │  │
│  │  │                                              │    │  │
│  │  │  • API Routes (/api/*)                      │    │  │
│  │  │  • Server Components                        │    │  │
│  │  │  • Static Assets                            │    │  │
│  │  │  • Health Checks                            │    │  │
│  │  └──────────────────────────────────────────────┘    │  │
│  │                                                        │  │
│  │  ┌──────────────────────────────────────────────┐    │  │
│  │  │         In-Memory Cache (8-hour TTL)         │    │  │
│  │  │                                              │    │  │
│  │  │  • News Articles Cache                      │    │  │
│  │  │  • Category-based Storage                   │    │  │
│  │  │  • Automatic Expiration                     │    │  │
│  │  └──────────────────────────────────────────────┘    │  │
│  │                                                        │  │
│  │  User: nextjs (UID 1001) - Non-root for security     │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
│  Base Image: node:20-alpine (~150MB)                        │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Port 3000
                            ▼
                    ┌───────────────┐
                    │  Host Machine │
                    │  Port 3000    │
                    └───────────────┘
                            │
                            ▼
                    External Services
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│   Supabase   │   │  RSS Feeds   │   │    Users     │
│              │   │              │   │              │
│ • Database   │   │ • TechCrunch │   │ • Browsers   │
│ • Auth       │   │ • The Verge  │   │ • Mobile     │
│ • Storage    │   │ • Wired      │   │ • API Calls  │
└──────────────┘   └──────────────┘   └──────────────┘
```

## Multi-Stage Build Process

```
┌─────────────────────────────────────────────────────────────┐
│                    Stage 1: Base                             │
│                                                              │
│  FROM node:20-alpine                                         │
│  • Minimal Alpine Linux base                                │
│  • Node.js 20 runtime                                       │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Stage 2: Dependencies                     │
│                                                              │
│  • Install production dependencies only                     │
│  • npm ci --only=production                                 │
│  • Clean npm cache                                          │
│  Size: ~200MB                                               │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Stage 3: Builder                          │
│                                                              │
│  • Install all dependencies (dev + prod)                    │
│  • Copy source code                                         │
│  • Build Next.js application                                │
│  • Generate standalone output                               │
│  Size: ~1GB (discarded)                                     │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Stage 4: Runner (Final)                   │
│                                                              │
│  • Copy only built files from builder                       │
│  • Copy standalone server                                   │
│  • Copy static assets                                       │
│  • Create non-root user                                     │
│  • Set up health checks                                     │
│  Final Size: ~150MB ✓                                       │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

```
┌──────────┐
│  Client  │
└────┬─────┘
     │
     │ HTTP Request
     ▼
┌─────────────────────────────────────┐
│     Docker Container (Port 3000)    │
│                                     │
│  ┌───────────────────────────────┐ │
│  │    Next.js API Routes         │ │
│  │                               │ │
│  │  1. Check Cache               │ │
│  │     │                         │ │
│  │     ├─ Hit? → Return (50ms)   │ │
│  │     │                         │ │
│  │     └─ Miss? ↓                │ │
│  │                               │ │
│  │  2. Fetch RSS Feeds           │ │
│  │     (Concurrent limit: 3)     │ │
│  │     │                         │ │
│  │  3. Store in Cache            │ │
│  │     (8-hour TTL)              │ │
│  │     │                         │ │
│  │  4. Save to Database          │ │
│  │     (Batch upsert)            │ │
│  │     │                         │ │
│  │  5. Return Response           │ │
│  └───────────────────────────────┘ │
└─────────────────────────────────────┘
     │
     │ JSON Response
     ▼
┌──────────┐
│  Client  │
└──────────┘
```

## Health Check Flow

```
Every 30 seconds:

Docker Engine
     │
     │ HTTP GET /api/health
     ▼
Container (localhost:3000)
     │
     │ Check application status
     ▼
┌─────────────────────────┐
│  Health Check Response  │
│                         │
│  {                      │
│    status: "healthy",   │
│    uptime: 3600,        │
│    timestamp: "..."     │
│  }                      │
└─────────────────────────┘
     │
     ▼
Container Status: Healthy ✓

If fails 3 times → Container marked unhealthy
```

## Security Layers

```
┌─────────────────────────────────────────────────────────────┐
│                     Security Layers                          │
│                                                              │
│  1. Non-root User (nextjs:1001)                             │
│     └─ Application runs with minimal privileges             │
│                                                              │
│  2. Minimal Base Image (Alpine Linux)                       │
│     └─ Smaller attack surface                               │
│                                                              │
│  3. No Build Tools in Production                            │
│     └─ Only runtime dependencies                            │
│                                                              │
│  4. Environment Variable Isolation                          │
│     └─ Secrets not baked into image                         │
│                                                              │
│  5. Health Checks                                           │
│     └─ Automatic failure detection                          │
│                                                              │
│  6. Resource Limits (Optional)                              │
│     └─ CPU and memory constraints                           │
└─────────────────────────────────────────────────────────────┘
```

## Deployment Options

```
┌─────────────────────────────────────────────────────────────┐
│                    Local Development                         │
│                                                              │
│  docker-compose -f docker-compose.dev.yml up                │
│  • Hot reload enabled                                       │
│  • Source code mounted                                      │
│  • Development dependencies                                 │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    Production Deployment                     │
│                                                              │
│  docker-compose up -d                                       │
│  • Optimized build                                          │
│  • Production dependencies only                             │
│  • Health checks enabled                                    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    Cloud Deployment                          │
│                                                              │
│  • AWS ECS / Fargate                                        │
│  • Google Cloud Run                                         │
│  • Azure Container Instances                                │
│  • DigitalOcean App Platform                                │
│  • Kubernetes (K8s)                                         │
└─────────────────────────────────────────────────────────────┘
```

## Resource Usage

```
┌─────────────────────────────────────────────────────────────┐
│                    Resource Metrics                          │
│                                                              │
│  Image Size:        ~150MB                                  │
│  Memory Usage:      ~512MB (typical)                        │
│  CPU Usage:         ~0.5 cores (typical)                    │
│  Startup Time:      ~5-10 seconds                           │
│  Build Time:        ~2-3 minutes                            │
│                                                              │
│  With Caching:                                              │
│  • Response Time:   50-200ms                                │
│  • API Calls:       ~3 per day                              │
│  • Memory Stable:   Yes                                     │
└─────────────────────────────────────────────────────────────┘
```

