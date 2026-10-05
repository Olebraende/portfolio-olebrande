import type { Metadata } from 'next';
import BackLink from '@/components/BackLink';
import { alternates, getDictionary, resolveLang } from '@/lib/i18n';
import { GITHUB_URL, LINKEDIN_URL } from '@/lib/site';
import ContactForm from '@/components/ContactForm';
import EmailCopy from '@/components/EmailCopy';
import { Github, Linkedin } from '@/app/icons';
import styles from './kontakt.module.css';

export async function generateMetadata({ params }: PageProps<'/[lang]/kontakt'>): Promise<Metadata> {
  const lang = resolveLang((await params).lang);
  const dict = getDictionary(lang);
  return {
    title: dict.meta.contactTitle,
    description: dict.meta.contactDescription,
    alternates: alternates(lang, '/kontakt'),
    openGraph: { title: dict.meta.contactTitle, description: dict.meta.contactDescription },
  };
}

export default async function ContactPage({ params }: PageProps<'/[lang]/kontakt'>) {
  const lang = resolveLang((await params).lang);
  const dict = getDictionary(lang);
  const c = dict.contact;

  return (
    <>
      <section className="page-hero container">
        <BackLink lang={lang} dict={dict} />
        <p className="eyebrow">{c.eyebrow}</p>
        <h1>{c.title}</h1>
        <p>{c.subtitle}</p>
      </section>

      <section className={`container ${styles.grid}`}>
        <div className={styles.formBox}>
          <h2>{c.formTitle}</h2>
          <ContactForm lang={lang} dict={dict} />
        </div>

        <aside className={styles.info} aria-labelledby="info-title">
          <h2 id="info-title">{c.infoTitle}</h2>
          <EmailCopy dict={dict} />
          <ul className={styles.social}>
            <li>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                <Linkedin width={20} height={20} /> LinkedIn
                <span className="visually-hidden"> {dict.common.opensNew}</span>
              </a>
            </li>
            <li>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                <Github width={20} height={20} /> GitHub
                <span className="visually-hidden"> {dict.common.opensNew}</span>
              </a>
            </li>
          </ul>
        </aside>
      </section>
    </>
  );
}
