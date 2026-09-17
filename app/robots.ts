import type { MetadataRoute } from 'next';
import { siteUrl, isIndexable } from '@/lib/seo';
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      ...(isIndexable ? { allow: '/', disallow: ['/*?presentation=', '/*?category='] } : { disallow: '/' }),
    },
    ...(siteUrl ? { sitemap: siteUrl + '/sitemap.xml' } : {}),
  };
}
