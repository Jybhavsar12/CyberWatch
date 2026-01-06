import Parser from 'rss-parser'

const parser = new Parser()

export interface NewsItem {
  title: string
  description: string
  url: string
  imageUrl?: string
  source: string
  category: 'tech' | 'cybersecurity' | 'both'
  publishedAt: Date
  author?: string
  tags: string[]
}

// RSS Feed sources for tech and cybersecurity news
const RSS_FEEDS = {
  tech: [
    { url: 'https://techcrunch.com/feed/', name: 'TechCrunch' },
    { url: 'https://www.theverge.com/rss/index.xml', name: 'The Verge' },
    { url: 'https://www.wired.com/feed/rss', name: 'Wired' },
    { url: 'https://feeds.arstechnica.com/arstechnica/index', name: 'Ars Technica' },
  ],
  cybersecurity: [
    { url: 'https://feeds.feedburner.com/TheHackersNews', name: 'The Hacker News' },
    { url: 'https://www.bleepingcomputer.com/feed/', name: 'Bleeping Computer' },
    { url: 'https://krebsonsecurity.com/feed/', name: 'Krebs on Security' },
    { url: 'https://threatpost.com/feed/', name: 'Threatpost' },
    { url: 'https://www.darkreading.com/rss.xml', name: 'Dark Reading' },
  ],
}

export async function fetchNewsFromRSS(
  category: 'tech' | 'cybersecurity' | 'all' = 'all'
): Promise<NewsItem[]> {
  const feeds = category === 'all' 
    ? [...RSS_FEEDS.tech, ...RSS_FEEDS.cybersecurity]
    : category === 'tech'
    ? RSS_FEEDS.tech
    : RSS_FEEDS.cybersecurity

  const allNews: NewsItem[] = []

  for (const feed of feeds) {
    try {
      const rssFeed = await parser.parseURL(feed.url)
      
      const items = rssFeed.items.slice(0, 10).map((item) => ({
        title: item.title || 'No title',
        description: item.contentSnippet || item.content || '',
        url: item.link || '',
        imageUrl: item.enclosure?.url || undefined,
        source: feed.name,
        category: RSS_FEEDS.tech.includes(feed) ? 'tech' as const : 'cybersecurity' as const,
        publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
        author: item.creator || item.author,
        tags: item.categories || [],
      }))

      allNews.push(...items)
    } catch (error) {
      console.error(`Error fetching from ${feed.name}:`, error)
    }
  }

  // Sort by published date (newest first)
  return allNews.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
}

export async function searchNews(query: string): Promise<NewsItem[]> {
  const allNews = await fetchNewsFromRSS('all')
  
  const lowerQuery = query.toLowerCase()
  return allNews.filter(
    (item) =>
      item.title.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery) ||
      item.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  )
}

