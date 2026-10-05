import type { Metadata } from 'next';
import BackLink from '@/components/BackLink';
import { alternates, getDictionary, resolveLang } from '@/lib/i18n';
import CtaBand from '@/components/CtaBand';
import Spotlight from '@/components/Spotlight';
import { Check } from '@/app/icons';
import styles from './tjenester.module.css';

export async function generateMetadata({ params }: PageProps<'/[lang]/tjenester'>): Promise<Metadata> {
  const lang = resolveLang((await params).lang);
  const dict = getDictionary(lang);
  return {
    title: dict.meta.servicesTitle,
    description: dict.meta.servicesDescription,
    alternates: alternates(lang, '/tjenester'),
    openGraph: { title: dict.meta.servicesTitle, description: dict.meta.servicesDescription },
  };
}

export default async function ServicesPage({ params }: PageProps<'/[lang]/tjenester'>) {
  const lang = resolveLang((await params).lang);
  const dict = getDictionary(lang);
  const s = dict.services;

  return (
    <>
      <section className="page-hero container">
        <BackLink lang={lang} dict={dict} />
        <p className="eyebrow">{s.eyebrow}</p>
        <h1>{s.title}</h1>
        <p>{s.subtitle}</p>
      </section>

      <section className="container">
        <Spotlight as="ul" className={styles.grid}>
          {s.items.map((item, i) => (
            <li key={item.title} className={`${styles.card} reveal`} data-spot>
              <span className={styles.num} aria-hidden="true">
                0{i + 1}
              </span>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
              <ul className={styles.features}>
                {item.features.map((f) => (
                  <li key={f}>
                    <Check width={18} height={18} /> {f}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </Spotlight>
      </section>

      <CtaBand lang={lang} title={s.ctaTitle} text={s.ctaText} button={s.ctaButton} />
    </>
  );
}
