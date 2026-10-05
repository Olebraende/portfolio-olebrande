import styles from './Hero.module.css';

type Stat = { value: number; suffix?: string; label: string };

/** Counts up with a CSS @property animation; the real value stays in the DOM for screen readers. */
export default function HeroStats({ stats }: { stats: Stat[] }) {
  return (
    <dl className={styles.stats}>
      {stats.map(({ value, suffix = '', label }) => (
        <div key={label} className={styles.stat}>
          <dt>{label}</dt>
          <dd>
            <span className="visually-hidden">
              {value}
              {suffix}
            </span>
            <span
              className={styles.counter}
              style={{ ['--target' as string]: value }}
              data-suffix={suffix}
              aria-hidden="true"
            />
          </dd>
        </div>
      ))}
    </dl>
  );
}
