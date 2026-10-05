import type { Dictionary } from '@/dictionaries/no';
import styles from './About.module.css';

export default function About({ dict }: { dict: Dictionary }) {
  const a = dict.about;
  return (
    <section className="section" aria-labelledby="about-title" id="about">
      <div className={`container ${styles.grid}`}>
        <div className="reveal">
          <p className="eyebrow">{a.eyebrow}</p>
          <h2 id="about-title" className="section-title">
            {a.title}
          </h2>
        </div>
        <div className={`${styles.body} reveal`}>
          {a.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <dl className={styles.facts}>
            {a.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
