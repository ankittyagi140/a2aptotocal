import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/submission-success'
      ],
    },
    sitemap: 'https://a2aprotocol.com/sitemap.xml',
  };
} 