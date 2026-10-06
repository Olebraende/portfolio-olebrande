import type { Dictionary } from '@/dictionaries/no';
import styles from './Experience.module.css';

type Job = Dictionary['experience']['items'][number];

function JobEntry({ job, currentLabel }: { job: Job; currentLabel: string }) {
  return (
    <li className={`${styles.entry} reveal`}>
      <span className={styles.dot} data-current={job.current} aria-hidden="true" />

      <div className={styles.head}>
        <h3>{job.role}</h3>
        {job.current && <span className={styles.badge}>{currentLabel}</span>}
      </div>

      <p className={styles.meta}>
        <span className={styles.company}>{job.company}</span>
        <span>{job.type}</span>
        <span>{job.period}</span>
        <span>{job.location}</span>
      </p>

      <p className={styles.text}>{job.text}</p>

      <ul className={styles.tags} aria-label="Tags">
        {job.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </li>
  );
}

export default function Experience({ dict }: { dict: Dictionary }) {
  const { eyebrow, title, current, items } = dict.experience;

  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container">
        <header className="reveal">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="experience-title" className="section-title">
            {title}
          </h2>
        </header>

        <ol className={styles.list}>
          {items.map((job) => (
            <JobEntry key={`${job.company}-${job.period}`} job={job} currentLabel={current} />
          ))}
        </ol>
      </div>
    </section>
  );
}
