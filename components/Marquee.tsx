import { STACK } from '@/lib/site';
import styles from './Marquee.module.css';

export default function Marquee({ label }: { label: string }) {
  return (
    <section id="stack" className={styles.wrap} aria-label={label}>
      <div className={styles.track}>
        {[0, 1].map((copy) => (
          <ul key={copy} className={styles.list} aria-hidden={copy === 1 ? 'true' : undefined}>
            {STACK.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
