import type { Dictionary } from '@/dictionaries/no';
import styles from './Building.module.css';

export default function Building({ dict }: { dict: Dictionary }) {
  const b = dict.building;
  return (
    <section className="container" aria-labelledby="building-title">
      <div className={`${styles.box} reveal`}>
        <span className={styles.badge}>
          <span className={styles.pulse} aria-hidden="true" />
          {b.badge}
        </span>
        <h2 id="building-title" className={styles.title}>
          <span className="gradient-text">{b.title}</span>
        </h2>
        <p>{b.text}</p>
      </div>
    </section>
  );
}
