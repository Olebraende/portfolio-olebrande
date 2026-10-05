import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { LANGS, getDictionary, htmlLang, ogLocale, resolveLang } from '@/lib/i18n';
import { GITHUB_URL, LINKEDIN_URL, SITE_NAME, SITE_URL } from '@/lib/site';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Consent from '@/components/Consent';
import ScrollReset from '@/components/ScrollReset';
import '../globals.css';

export const viewport: Viewport = {
  themeColor: '#0a0a0b',
  colorScheme: 'dark',
};

export const generateStaticParams = () => LANGS.map((lang) => ({ lang }));

export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const lang = resolveLang((await params).lang);
  return {
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    icons: { icon: '/pics/pic-ole-1.jpg' },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: ogLocale(lang),
      images: [{ url: '/pics/og-preview.png', width: 2984, height: 1502, alt: SITE_NAME }],
    },
    twitter: { card: 'summary_large_image', images: ['/pics/og-preview.png'] },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const lang = resolveLang((await params).lang);
  const dict = getDictionary(lang);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: SITE_NAME,
        url: SITE_URL,
        image: `${SITE_URL}/pics/pic-ole-1.jpg`,
        jobTitle: lang === 'no' ? 'Frontend-utvikler' : 'Frontend developer',
        knowsAbout: ['Next.js', 'React', 'TypeScript', 'Web performance', 'Accessibility', 'SEO'],
        sameAs: [GITHUB_URL, LINKEDIN_URL],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: [htmlLang('no'), htmlLang('en')],
        publisher: { '@id': `${SITE_URL}/#person` },
      },
    ],
  };

  return (
    <html lang={htmlLang(lang)} className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          {dict.common.skip}
        </a>
        <div className="progress" aria-hidden="true" />
        <ScrollReset />
        <Header lang={lang} dict={dict} />
        <main id="main">{children}</main>
        <Footer lang={lang} dict={dict} />
        <Consent dict={dict} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
      </body>
    </html>
  );
}
