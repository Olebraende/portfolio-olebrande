import Link from 'next/link';
import { href, type Lang } from '@/lib/i18n';
import { featuredProjects } from '@/lib/projects';
import type { Dictionary } from '@/dictionaries/no';
import { ArrowRight } from '@/app/icons';
import ProjectCard from './ProjectCard';
import Spotlight from './Spotlight';
import styles from './FeaturedProjects.module.css';

export default function FeaturedProjects({ lang, dict }: { lang: Lang; dict: Dictionary }) {
  return (
    <section className="section" aria-labelledby="featured-title" id="projects">
      <div className="container">
        <div className={`${styles.head} reveal`}>
          <div>
            <p className="eyebrow">{dict.projects.eyebrow}</p>
            <h2 id="featured-title" className="section-title">
              {dict.projects.title}
            </h2>
          </div>
          <Link href={href(lang, '/prosjekter')} className="btn">
            {dict.projects.viewAll} <ArrowRight />
          </Link>
        </div>

        <Spotlight as="ul" className={styles.grid}>
          {featuredProjects.map((p) => (
            <li key={p.slug} className="reveal">
              <ProjectCard project={p} lang={lang} dict={dict} />
            </li>
          ))}
        </Spotlight>
      </div>
    </section>
  );
}
