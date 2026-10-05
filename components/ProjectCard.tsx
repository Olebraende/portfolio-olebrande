import Image from 'next/image';
import type { Lang } from '@/lib/i18n';
import type { Project } from '@/lib/projects';
import type { Dictionary } from '@/dictionaries/no';
import { ArrowUpRight, Github } from '@/app/icons';
import styles from './ProjectCard.module.css';

export default function ProjectCard({
  project,
  lang,
  dict,
  priority = false,
  headingLevel = 3,
}: {
  project: Project;
  lang: Lang;
  dict: Dictionary;
  priority?: boolean;
  headingLevel?: 2 | 3;
}) {
  const Heading = `h${headingLevel}` as const;
  const [w, h] = project.imageSize;
  return (
    <article className={styles.card} data-spot>
      <div className={styles.media}>
        <Image
          src={project.image}
          alt=""
          width={w}
          height={h}
          sizes="(min-width: 1000px) 380px, (min-width: 640px) 50vw, 100vw"
          quality={70}
          priority={priority}
          className={styles.img}
        />
      </div>
      <div className={styles.body}>
        <ul className={styles.tags} aria-label="Tags">
          {project.tags.map((tag) => (
            <li key={tag}>{dict.projects.tags[tag] ?? tag}</li>
          ))}
        </ul>
        <Heading className={styles.title}>
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.stretch}>
            {project.title}
            <span className="visually-hidden"> {dict.common.opensNew}</span>
            <ArrowUpRight className={styles.arrow} width={20} height={20} />
          </a>
        </Heading>
        <p className={styles.desc}>{project.description[lang]}</p>
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.code}
            aria-label={`${project.title} – ${dict.common.viewCode} ${dict.common.opensNew}`}
          >
            <Github width={16} height={16} /> {dict.common.viewCode}
          </a>
        )}
      </div>
    </article>
  );
}
