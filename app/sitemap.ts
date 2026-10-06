import type { MetadataRoute } from 'next';
import { href } from '@/lib/i18n';
import { projects } from '@/lib/projects';
import { SITE_URL } from '@/lib/site';

const pages = [
  { path: '/', priority: 1, changeFrequency: 'weekly' as const },
  { path: '/prosjekter', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/kontakt', priority: 0.8, changeFrequency: 'monthly' as const },
  ...projects.map((project) => ({
    path: `/prosjekter/${project.slug}`,
    priority: 0.6,
    changeFrequency: 'monthly' as const,
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${href('no', path)}`,
    changeFrequency,
    priority,
    alternates: {
      languages: { nb: `${SITE_URL}${href('no', path)}`, en: `${SITE_URL}${href('en', path)}` },
    },
  }));
}
