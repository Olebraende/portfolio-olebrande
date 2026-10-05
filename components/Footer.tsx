import Link from 'next/link';
import { href, type Lang } from '@/lib/i18n';
import { GITHUB_URL, LINKEDIN_URL } from '@/lib/site';
import type { Dictionary } from '@/dictionaries/no';
import { ArrowUp, Github, Linkedin } from '@/app/icons';
import styles from './Footer.module.css';

export default function Footer({ lang, dict }: { lang: Lang; dict: Dictionary }) {
  const year = new Date().getFullYear();
  const nav = [
    { path: '/prosjekter', label: dict.nav.projects },
    { path: '/kontakt', label: dict.nav.contact },
  ];

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.about}>
          <p className={styles.title}>{dict.footer.title}</p>
          <p className={styles.text}>{dict.footer.text}</p>
        </div>

        <nav aria-label="Footer">
          <ul className={styles.links}>
            {nav.map((n) => (
              <li key={n.path}>
                <Link href={href(lang, n.path)}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className={styles.social} aria-label={dict.footer.social}>
          <li>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label={`GitHub ${dict.common.opensNew}`}>
              <Github />
            </a>
          </li>
          <li>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`LinkedIn ${dict.common.opensNew}`}
            >
              <Linkedin />
            </a>
          </li>
        </ul>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>
          © {year} Ole Mathias Brænde. {dict.footer.rights}
        </p>
        <p>{dict.footer.built}</p>
        <a href="#main" className={styles.top}>
          {dict.footer.backToTop} <ArrowUp width={16} height={16} />
        </a>
      </div>
    </footer>
  );
}
