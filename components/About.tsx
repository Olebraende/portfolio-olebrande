import type { Dictionary } from '@/dictionaries/no';
import styles from './About.module.css';

type Fact = { label: string; value: string };

function Paragraphs({ items }: { items: string[] }) {
  return items.map((text) => <p key={text}>{text}</p>);
}

function FactList({ facts }: { facts: Fact[] }) {
  return (
    <dl className={styles.facts}>
      {facts.map(({ label, value }) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function About({ dict }: { dict: Dictionary }) {
  const { eyebrow, title, paragraphs, facts } = dict.about;

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className={`container ${styles.grid}`}>
        <header className="reveal">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="about-title" className="section-title">
            {title}
          </h2>
        </header>

        <div className={`${styles.body} reveal`}>
          <Paragraphs items={paragraphs} />
          <FactList facts={facts} />
        </div>
      </div>
    </section>
  );
}
