import Link from 'next/link';
import { href, type Lang } from '@/lib/i18n';
import { projects } from '@/lib/projects';
import type { Dictionary } from '@/dictionaries/no';
import { ArrowRight } from '@/app/icons';
import HeroCard from './HeroCard';
import HeroStats from './HeroStats';
import Spotlight from './Spotlight';
import styles from './Hero.module.css';

const START = new Date(2024, 8, 1); // September 2024

function monthsSinceStart() {
  const now = new Date();
  return (now.getFullYear() - START.getFullYear()) * 12 + (now.getMonth() - START.getMonth());
}

function StatusPill({ children }: { children: React.ReactNode }) {
  return (
    <p className={styles.status}>
      <span className={styles.dot} aria-hidden="true" />
      {children}
    </p>
  );
}

function Headline({ lines }: { lines: string[] }) {
  return (
    <h1 id="hero-title" className={styles.title}>
      {lines.map((line, index) => (
        <span key={line} className={styles.line} style={{ ['--i' as string]: index }}>
          <span className={index === 1 ? 'gradient-text' : undefined}>{line}</span>
        </span>
      ))}
    </h1>
  );
}

export default function Hero({ lang, dict }: { lang: Lang; dict: Dictionary }) {
  const { hero } = dict;

  const stats = [
    { value: projects.filter((p) => p.status === 'live').length, label: hero.stats.projects },
    { value: monthsSinceStart(), suffix: '+', label: hero.stats.months },
    { value: 100, label: hero.stats.lighthouse },
  ];

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.orb} aria-hidden="true" />

      <Spotlight className={styles.inner}>
        <div className={`container ${styles.layout}`}>
          <div className={styles.copy}>
            <StatusPill>{hero.status}</StatusPill>
            <p className={styles.greeting}>{hero.greeting}</p>
            <Headline lines={hero.titleLines} />
            <p className={styles.description}>{hero.description}</p>

            <div className={styles.cta}>
              <Link href={href(lang, '/prosjekter')} className="btn btn-primary">
                {hero.ctaProjects} <ArrowRight />
              </Link>
              <Link href={href(lang, '/kontakt')} className="btn">
                {hero.ctaContact}
              </Link>
            </div>

            <HeroStats stats={stats} />
          </div>

          <HeroCard lang={lang} dict={dict} />
        </div>
      </Spotlight>

      <a href="#stack" className={styles.scroll}>
        <span className="visually-hidden">{hero.scroll}</span>
        <span className={styles.mouse} aria-hidden="true" />
      </a>
    </section>
  );
}
