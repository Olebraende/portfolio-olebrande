import type { MetadataRoute } from 'next';
import { href } from '@/lib/i18n';
import { SITE_URL } from '@/lib/site';

const paths = ['/', '/prosjekter', '/tjenester', '/kontakt'];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({
    url: `${SITE_URL}${href('no', p)}`,
    changeFrequency: p === '/' ? 'weekly' : 'monthly',
    priority: p === '/' ? 1 : 0.8,
    alternates: {
      languages: { nb: `${SITE_URL}${href('no', p)}`, en: `${SITE_URL}${href('en', p)}` },
    },
  }));
}
