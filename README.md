# 🛡️ CyberWatch - Tech & Cybersecurity News Platform

A modern, secure, full-stack news aggregation platform built with Next.js 14+, featuring real-time tech and cybersecurity news from trusted sources worldwide.

![Next.js](https://img.shields.io/badge/Next.js-14+-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)
![Supabase](https://img.shields.io/badge/Supabase-Database-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

### 📰 News Aggregation
- **Real-time Updates**: Fetch latest news from multiple RSS feeds
- **Dual Categories**: Tech and Cybersecurity news streams
- **Smart Search**: Full-text search across articles
- **Source Attribution**: Track news from TechCrunch, The Hacker News, Bleeping Computer, and more

### � Community Features
- **Article Comments**: Engage with other readers on any article
- **Newsletter Subscription**: Subscribe to receive curated news via email
- **User Authentication**: Secure login and signup with Supabase Auth

### �🔐 Security Features
- **Rate Limiting**: Prevent API abuse with configurable limits
- **CORS Protection**: Secure cross-origin resource sharing
- **Security Headers**: CSP, XSS protection, frame options
- **Row Level Security**: Database-level access control
- **Input Validation**: Zod schema validation for all inputs
- **API Key Authentication**: Optional API key protection

### 🎨 Modern UI/UX
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Beautiful Components**: shadcn/ui component library
- **Dark Mode Ready**: Theme support built-in
- **Smooth Animations**: Polished user experience

### 🚀 Performance
- **Server Components**: React Server Components for optimal performance
- **Edge Functions**: Deploy to Vercel Edge Network
- **Optimized Images**: Next.js Image optimization
- **Caching Strategy**: Smart caching for better performance

## 🏗️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Validation**: Zod
- **News Parsing**: rss-parser
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (free tier available)
- Git

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Jybhavsar12/CyberWatch.git
cd CyberWatch
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API
3. Copy your project URL and anon key
4. Run the database schema:
   - Go to SQL Editor in Supabase Dashboard
   - Copy contents from `supabase/schema.sql`
   - Execute the SQL

### 4. Configure Environment Variables

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Update with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🌐 Deployment to Vercel & GitHub

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: CyberWatch platform"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure environment variables:
   - Add all variables from `.env.local`
5. Click "Deploy"

### Step 3: Configure Custom Domain (Optional)

1. Go to Project Settings > Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## 🔒 Security Configuration

### Rate Limiting

The platform includes built-in rate limiting:
- 30 requests/minute for news endpoints
- 20 requests/minute for search
- 10 requests/minute for save/delete operations

### API Security Headers

All responses include:
- Content Security Policy (CSP)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy
- XSS Protection

### Database Security

- Row Level Security (RLS) enabled on all tables
- User-specific data isolation
- Secure authentication with Supabase Auth

## 📁 Project Structure

```
cyberwatch/
├── app/
│   ├── api/              # API routes
│   │   ├── news/         # News endpoints
│   │   └── newsletter/   # Newsletter subscription
│   ├── about/            # About page
│   ├── privacy/          # Privacy policy
│   ├── terms/            # Terms of service
│   ├── login/            # Login page
│   ├── subscribe/        # Subscribe page
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/
│   ├── ui/               # Reusable UI components
│   ├── news-card.tsx     # Article card component
│   ├── news-feed.tsx     # Main feed component
│   ├── article-comments.tsx  # Comments component
│   ├── newsletter-signup.tsx # Newsletter form
│   └── theme-toggle.tsx  # Dark mode toggle
├── lib/
│   ├── supabase/         # Supabase client configs
│   ├── services/         # Business logic
│   ├── middleware/       # Security middleware
│   ├── validations/      # Zod schemas
│   └── types/            # TypeScript types
├── supabase/
│   └── schema.sql        # Database schema
└── public/               # Static assets
```

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 📊 API Endpoints

### GET /api/news
Fetch latest news articles
- Query params: `category` (tech|cybersecurity|all), `limit` (number)

### GET /api/news/search
Search articles
- Query params: `q` (search query), `category` (optional)

### POST /api/newsletter/subscribe
Subscribe to newsletter
- Body: `{ email: string }`

## 🎯 News Sources

### Tech News
- TechCrunch
- The Verge
- Wired
- Ars Technica

### Cybersecurity News
- The Hacker News
- Bleeping Computer
- Krebs on Security
- Threatpost
- Dark Reading

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Supabase for the backend infrastructure
- shadcn for the beautiful UI components
- All the news sources for providing RSS feeds

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js, TypeScript, and Supabase
