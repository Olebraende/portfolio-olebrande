import Link from 'next/link';
import { href, type Lang } from '@/lib/i18n';
import { projectTitle, type Project } from '@/lib/projects';
import type { Dictionary } from '@/dictionaries/no';
import { ArrowRight, ArrowUpRight, Github } from '@/app/icons';
import ProjectMedia from './ProjectMedia';
import styles from './ProjectCard.module.css';

function ExternalLink({
  url,
  label,
  title,
  dict,
  children,
}: {
  url: string;
  label: string;
  title: string;
  dict: Dictionary;
  children: React.ReactNode;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.ext}
      aria-label={`${title}, ${label} ${dict.common.opensNew}`}
    >
      {children}
    </a>
  );
}

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
  const isLive = project.status === 'live';
  const title = projectTitle(project, lang);

  return (
    <article className={styles.card} data-spot>
      <div className={styles.media}>
        <ProjectMedia
          project={project}
          lang={lang}
          dict={dict}
          sizes="(min-width: 1000px) 380px, (min-width: 640px) 50vw, 100vw"
          priority={priority}
          className={styles.img}
        />
        {!isLive && (
          <span className={`${styles.badge} ${project.status === 'archived' ? styles.badgeMuted : ''}`}>
            {dict.projects.status[project.status]}
          </span>
        )}
      </div>

      <div className={styles.body}>
        <ul className={styles.tags} aria-label="Tags">
          {project.tags.map((tag) => (
            <li key={tag}>{dict.projects.tags[tag] ?? tag}</li>
          ))}
        </ul>

        <Heading className={styles.title}>
          <Link href={href(lang, `/prosjekter/${project.slug}`)} className={styles.stretch}>
            {title}
            <ArrowRight className={styles.arrow} width={20} height={20} />
          </Link>
        </Heading>

        <p className={styles.desc}>{project.description[lang]}</p>

        <div className={styles.links}>
          {project.liveUrl && isLive && (
            <ExternalLink url={project.liveUrl} label={dict.common.viewLive} title={title} dict={dict}>
              <ArrowUpRight width={16} height={16} /> {dict.common.viewLive}
            </ExternalLink>
          )}
          {project.githubUrl && (
            <ExternalLink url={project.githubUrl} label={dict.common.viewCode} title={title} dict={dict}>
              <Github width={16} height={16} /> {dict.common.viewCode}
            </ExternalLink>
          )}
        </div>
      </div>
    </article>
  );
}
