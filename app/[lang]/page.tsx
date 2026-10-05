import type { Metadata } from 'next';
import { alternates, getDictionary, resolveLang } from '@/lib/i18n';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import About from '@/components/About';
import Principles from '@/components/Principles';
import FeaturedProjects from '@/components/FeaturedProjects';
import Building from '@/components/Building';
import CtaBand from '@/components/CtaBand';

export async function generateMetadata({ params }: PageProps<'/[lang]'>): Promise<Metadata> {
  const lang = resolveLang((await params).lang);
  const dict = getDictionary(lang);
  return {
    title: { absolute: dict.meta.homeTitle },
    description: dict.meta.homeDescription,
    alternates: alternates(lang, '/'),
    openGraph: { title: dict.meta.homeTitle, description: dict.meta.homeDescription },
  };
}

export default async function HomePage({ params }: PageProps<'/[lang]'>) {
  const lang = resolveLang((await params).lang);
  const dict = getDictionary(lang);

  return (
    <>
      <Hero lang={lang} dict={dict} />
      <Marquee label={dict.stack.label} />
      <About dict={dict} />
      <Principles dict={dict} />
      <FeaturedProjects lang={lang} dict={dict} />
      <Building dict={dict} />
      <CtaBand
        lang={lang}
        title={dict.services.ctaTitle}
        text={dict.services.ctaText}
        button={dict.services.ctaButton}
      />
    </>
  );
}
