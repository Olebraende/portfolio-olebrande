import { notFound } from 'next/navigation';
import { no } from '@/dictionaries/no';
import { en } from '@/dictionaries/en';
import { SITE_URL } from './site';
import type { Metadata } from 'next';

export const LANGS = ['no', 'en'] as const;
export type Lang = (typeof LANGS)[number];

const dictionaries = { no, en };

export const isLang = (value: string): value is Lang => (LANGS as readonly string[]).includes(value);

export const getDictionary = (lang: Lang) => dictionaries[lang];

/** Resolve the `lang` route param, or 404. */
export function resolveLang(value: string): Lang {
  if (!isLang(value)) notFound();
  return value;
}

/** Public URL path. Norwegian lives at the root, English under /en. */
export function href(lang: Lang, path = '/'): string {
  if (lang === 'no') return path;
  return path === '/' ? '/en' : `/en${path}`;
}

/** Canonical + hreflang alternates for a page. */
export function alternates(lang: Lang, path = '/'): Metadata['alternates'] {
  return {
    canonical: `${SITE_URL}${href(lang, path)}`,
    languages: {
      nb: `${SITE_URL}${href('no', path)}`,
      en: `${SITE_URL}${href('en', path)}`,
      'x-default': `${SITE_URL}${href('no', path)}`,
    },
  };
}

export const htmlLang = (lang: Lang) => (lang === 'no' ? 'nb' : 'en');
export const ogLocale = (lang: Lang) => (lang === 'no' ? 'nb_NO' : 'en_US');
