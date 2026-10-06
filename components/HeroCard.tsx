import Image from 'next/image';
import type { Lang } from '@/lib/i18n';
import type { Dictionary } from '@/dictionaries/no';
import { GITHUB_URL } from '@/lib/site';
import { Github } from '@/app/icons';
import styles from './Hero.module.css';

const lineStyle = (index: number) => ({ ['--i' as string]: index });

function WindowBar() {
  return (
    <div className={styles.cardBar} aria-hidden="true">
      <i /> <i /> <i />
      <span>ole.ts</span>
    </div>
  );
}

function CodeSnippet() {
  return (
    <pre className={styles.code} aria-hidden="true">
      <code>
        <span className={styles.l} style={lineStyle(0)}>
          <b>const</b> ole = {'{'}
        </span>
        <span className={styles.l} style={lineStyle(1)}>
          {'  '}stack: [<s>&quot;Next.js&quot;</s>, <s>&quot;React&quot;</s>, <s>&quot;TypeScript&quot;</s>],
        </span>
        <span className={styles.l} style={lineStyle(2)}>
          {'  '}cares: [<s>&quot;ytelse&quot;</s>, <s>&quot;a11y&quot;</s>, <s>&quot;SEO&quot;</s>],
        </span>
        <span className={styles.l} style={lineStyle(3)}>
          {'  '}lighthouse: <em>100</em>,
        </span>
        <span className={styles.l} style={lineStyle(4)}>
          {'  '}hotChocolate: <b>true</b>,
        </span>
        <span className={styles.l} style={lineStyle(5)}>
          {'  '}openToWork: <b>true</b>
        </span>
        <span className={styles.l} style={lineStyle(6)}>
          {'}'};<span className={styles.caret} />
        </span>
      </code>
    </pre>
  );
}

export default function HeroCard({ lang, dict }: { lang: Lang; dict: Dictionary }) {
  const role = lang === 'no' ? 'Frontend-utvikler' : 'Frontend developer';

  return (
    <aside className={styles.card} aria-label="developer.ts">
      <WindowBar />
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
            <span>{role}</span>
          </div>
        </div>

        <CodeSnippet />

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
  );
}
