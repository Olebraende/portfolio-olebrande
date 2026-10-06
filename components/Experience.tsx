import { LINKEDIN_URL } from '@/lib/site';
import { ArrowUpRight } from '@/app/icons';
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

    </li>
  );
}

export default function Experience({ dict }: { dict: Dictionary }) {
  const { eyebrow, title, current, linkedin, items } = dict.experience;

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

        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn ${styles.more}`}
        >
          {linkedin}
          <span className="visually-hidden"> {dict.common.opensNew}</span>
          <ArrowUpRight />
        </a>
      </div>
    </section>
  );
}
