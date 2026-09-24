import type { MetadataRoute } from 'next';
import { siteUrl, isIndexable } from '@/lib/seo';
// Search and AI-search crawlers named explicitly so the site is open to Google, Bing and
// AI answer engines (GEO/AEO). They get the same rules as everyone else.
const AI_BOTS = [
  'Googlebot', 'Bingbot', 'Google-Extended', 'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User',
  'Applebot', 'Applebot-Extended', 'CCBot', 'meta-externalagent', 'DuckAssistBot',
];
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) return { rules: { userAgent: '*', disallow: '/' } };
  const rule = { allow: '/', disallow: ['/api/', '/*?presentation=', '/*?category='] };
  return {
    rules: [{ userAgent: '*', ...rule }, { userAgent: AI_BOTS, ...rule }],
    sitemap: siteUrl + '/sitemap.xml',
    host: siteUrl,
  };
}
