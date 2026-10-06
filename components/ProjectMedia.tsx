import Image from 'next/image';
import type { Lang } from '@/lib/i18n';
import { projectTitle, type Project } from '@/lib/projects';
import type { Dictionary } from '@/dictionaries/no';
import styles from './ProjectMedia.module.css';

/** Project screenshot, or a drawn placeholder while a project has none yet. */
export default function ProjectMedia({
  project,
  lang,
  dict,
  sizes,
  priority = false,
  className,
}: {
  project: Project;
  lang: Lang;
  dict: Dictionary;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  if (!project.image || !project.imageSize) {
    return (
      <div className={`${styles.placeholder} ${className ?? ''}`}>
        <span className={styles.mark} aria-hidden="true">
          {projectTitle(project, lang).slice(0, 1)}
        </span>
        <span>{dict.projects.detail.placeholder}</span>
      </div>
    );
  }

  const [width, height] = project.imageSize;
  return (
    <Image
      src={project.image}
      alt=""
      width={width}
      height={height}
      sizes={sizes}
      quality={70}
      priority={priority}
      className={className}
    />
  );
}
