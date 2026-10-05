import type { Dictionary } from '@/dictionaries/no';
import Spotlight from './Spotlight';
import styles from './Principles.module.css';

export default function Principles({ dict }: { dict: Dictionary }) {
  const p = dict.principles;
  return (
    <section className="section" aria-labelledby="principles-title">
      <div className="container">
        <div className="reveal">
          <p className="eyebrow">{p.eyebrow}</p>
          <h2 id="principles-title" className="section-title">
            {p.title}
          </h2>
        </div>

        <Spotlight as="ul" className={styles.grid}>
          {p.items.map((item, i) => (
            <li key={item.title} className={`${styles.card} reveal`} data-spot>
              <span className={styles.num} aria-hidden="true">
                0{i + 1}
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </Spotlight>
      </div>
    </section>
  );
}
