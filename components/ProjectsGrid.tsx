'use client';

import { useMemo, useState } from 'react';
import type { Lang } from '@/lib/i18n';
import type { Project } from '@/lib/projects';
import type { Dictionary } from '@/dictionaries/no';
import ProjectCard from './ProjectCard';
import Spotlight from './Spotlight';
import styles from './ProjectsGrid.module.css';

export default function ProjectsGrid({
  projects,
  lang,
  dict,
}: {
  projects: Project[];
  lang: Lang;
  dict: Dictionary;
}) {
  const [active, setActive] = useState('all');
  const tags = useMemo(() => [...new Set(projects.flatMap((p) => p.tags))], [projects]);
  const visible = active === 'all' ? projects : projects.filter((p) => p.tags.includes(active));

  return (
    <>
      <div role="group" aria-label={dict.projects.filterLabel} className={styles.filters}>
        {['all', ...tags].map((tag) => (
          <button
            key={tag}
            type="button"
            className={styles.chip}
            aria-pressed={active === tag}
            onClick={() => setActive(tag)}
          >
            {tag === 'all' ? dict.projects.filterAll : (dict.projects.tags[tag] ?? tag)}
          </button>
        ))}
      </div>

      <p className="visually-hidden" role="status">
        {visible.length} / {projects.length}
      </p>

      <Spotlight as="ul" className={styles.grid}>
        {visible.map((p, i) => (
          <li key={p.slug} className={styles.item}>
            <ProjectCard project={p} lang={lang} dict={dict} priority={i < 3} headingLevel={2} />
          </li>
        ))}
      </Spotlight>
      {visible.length === 0 && <p>{dict.projects.empty}</p>}
    </>
  );
}
