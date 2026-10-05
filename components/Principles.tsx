import type { Dictionary } from '@/dictionaries/no';
import Spotlight from './Spotlight';
import styles from './Principles.module.css';

type Principle = { title: string; text: string };

function PrincipleCard({ principle, number }: { principle: Principle; number: number }) {
  return (
    <li className={`${styles.card} reveal`} data-spot>
      <span className={styles.num} aria-hidden="true">
        {String(number).padStart(2, '0')}
      </span>
      <h3>{principle.title}</h3>
      <p>{principle.text}</p>
    </li>
  );
}

export default function Principles({ dict }: { dict: Dictionary }) {
  const { eyebrow, title, items } = dict.principles;

  return (
    <section className="section" aria-labelledby="principles-title">
      <div className="container">
        <header className="reveal">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="principles-title" className="section-title">
            {title}
          </h2>
        </header>

        <Spotlight as="ul" className={styles.grid}>
          {items.map((item, index) => (
            <PrincipleCard key={item.title} principle={item} number={index + 1} />
          ))}
        </Spotlight>
      </div>
    </section>
  );
}
