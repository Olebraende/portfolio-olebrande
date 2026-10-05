import Image from 'next/image';
import Link from 'next/link';
import { href, type Lang } from '@/lib/i18n';
import { projects } from '@/lib/projects';
import type { Dictionary } from '@/dictionaries/no';
import { ArrowRight, Github } from '@/app/icons';
import { GITHUB_URL } from '@/lib/site';
import Spotlight from './Spotlight';
import styles from './Hero.module.css';

const START = new Date(2024, 8, 1); // September 2024

function monthsSinceStart() {
  const now = new Date();
  return (now.getFullYear() - START.getFullYear()) * 12 + (now.getMonth() - START.getMonth());
}

export default function Hero({ lang, dict }: { lang: Lang; dict: Dictionary }) {
  const months = monthsSinceStart();
  const h = dict.hero;
  const stats = [
    { n: projects.length, suffix: '', label: h.stats.projects },
    { n: months, suffix: '+', label: h.stats.months },
    { n: 100, suffix: '', label: h.stats.lighthouse },
  ];

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.orb} aria-hidden="true" />

      <Spotlight className={styles.inner}>
        <div className={`container ${styles.layout}`}>
          <div className={styles.copy}>
            <p className={styles.status}>
              <span className={styles.dot} aria-hidden="true" />
              {h.status}
            </p>
            <p className={styles.greeting}>{h.greeting}</p>

            <h1 id="hero-title" className={styles.title}>
              {h.titleLines.map((line, i) => (
                <span key={line} className={styles.line} style={{ ['--i' as string]: i }}>
                  <span className={i === 1 ? 'gradient-text' : undefined}>{line}</span>
                </span>
              ))}
            </h1>

            <p className={styles.description}>{h.description}</p>

            <div className={styles.cta}>
              <Link href={href(lang, '/prosjekter')} className="btn btn-primary">
                {h.ctaProjects} <ArrowRight />
              </Link>
              <Link href={href(lang, '/kontakt')} className="btn">
                {h.ctaContact}
              </Link>
            </div>

            <dl className={styles.stats}>
              {stats.map((s) => (
                <div key={s.label} className={styles.stat}>
                  <dt>{s.label}</dt>
                  <dd>
                    <span className="visually-hidden">
                      {s.n}
                      {s.suffix}
                    </span>
                    <span
                      className={styles.counter}
                      style={{ ['--target' as string]: s.n }}
                      data-suffix={s.suffix}
                      aria-hidden="true"
                    />
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <aside className={styles.card} aria-label="developer.ts">
            <div className={styles.cardBar} aria-hidden="true">
              <i /> <i /> <i />
              <span>ole.ts</span>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.who}>
                <Image
                  src="/pics/pic-ole-1.jpg"
                  alt="Ole Mathias Brænde"
                  width={72}
                  height={72}
                  priority
                  sizes="72px"
                  className={styles.avatar}
                />
                <div>
                  <strong>Ole Mathias Brænde</strong>
                  <span>{lang === 'no' ? 'Frontend-utvikler' : 'Frontend developer'}</span>
                </div>
              </div>
              <pre className={styles.code} aria-hidden="true">
                <code>
                  <span className={styles.l} style={{ ['--i' as string]: 0 }}>
                    <b>const</b> ole = {'{'}
                  </span>
                  <span className={styles.l} style={{ ['--i' as string]: 1 }}>
                    {'  '}stack: [<s>&quot;Next.js&quot;</s>, <s>&quot;React&quot;</s>, <s>&quot;TypeScript&quot;</s>],
                  </span>
                  <span className={styles.l} style={{ ['--i' as string]: 2 }}>
                    {'  '}cares: [<s>&quot;ytelse&quot;</s>, <s>&quot;a11y&quot;</s>, <s>&quot;SEO&quot;</s>],
                  </span>
                  <span className={styles.l} style={{ ['--i' as string]: 3 }}>
                    {'  '}lighthouse: <em>100</em>,
                  </span>
                  <span className={styles.l} style={{ ['--i' as string]: 4 }}>
                    {'  '}coffee: <b>true</b>,
                  </span>
                  <span className={styles.l} style={{ ['--i' as string]: 5 }}>
                    {'  '}openToWork: <b>true</b>
                  </span>
                  <span className={styles.l} style={{ ['--i' as string]: 6 }}>
                    {'}'};<span className={styles.caret} />
                  </span>
                </code>
              </pre>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.gh}
                aria-label={`GitHub ${dict.common.opensNew}`}
              >
                <Github width={18} height={18} /> github.com/Olebraende
              </a>
            </div>
          </aside>
        </div>
      </Spotlight>

      <a href="#stack" className={styles.scroll}>
        <span className="visually-hidden">{h.scroll}</span>
        <span className={styles.mouse} aria-hidden="true" />
      </a>
    </section>
  );
}
