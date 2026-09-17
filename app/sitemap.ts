import type { MetadataRoute } from 'next';
import { siteUrl, isIndexable } from '@/lib/seo';
import { products } from '@/data/products';
import { articles } from '@/data/news';
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl || !isIndexable) return [];
  return [
    '',
    '/products',
    '/services',
    '/projects',
    '/about',
    '/news',
    '/contact',
    ...products.map((p) => '/products/' + p.slug),
    ...articles.map((a) => '/news/' + a.slug),
  ].map((path) => ({ url: siteUrl + path, changeFrequency: 'monthly', priority: path === '' ? 1 : 0.7 }));
}
