import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LANGS, alternates, getDictionary, href, resolveLang, type Lang } from '@/lib/i18n';
import { getNeighbours, getProject, projects, type Project } from '@/lib/projects';
import { SITE_URL } from '@/lib/site';
import type { Dictionary } from '@/dictionaries/no';
import BackLink from '@/components/BackLink';
import ProjectMedia from '@/components/ProjectMedia';
import { ArrowUpRight, Github } from '@/app/icons';
import styles from './project.module.css';

export const dynamicParams = false;

export const generateStaticParams = () =>
  LANGS.flatMap((lang) => projects.map((project) => ({ lang, slug: project.slug })));

export async function generateMetadata({ params }: PageProps<'/[lang]/prosjekter/[slug]'>): Promise<Metadata> {
  const { lang: rawLang, slug } = await params;
  const lang = resolveLang(rawLang);
  const project = getProject(slug);
  if (!project) notFound();

  const description = project.description[lang];
  const path = `/prosjekter/${project.slug}`;
  return {
    title: project.title,
    description,
    alternates: alternates(lang, path),
    openGraph: { title: project.title, description, url: `${SITE_URL}${href(lang, path)}` },
  };
}

function Facts({ project, lang, dict }: { project: Project; lang: Lang; dict: Dictionary }) {
  const d = dict.projects.detail;
  const facts = [
    { label: d.status, value: dict.projects.status[project.status] },
    project.year ? { label: d.year, value: project.year } : null,
    project.role ? { label: d.role, value: project.role[lang] } : null,
  ].filter((fact): fact is { label: string; value: string } => fact !== null);

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

function Links({ project, dict }: { project: Project; dict: Dictionary }) {
  const d = dict.projects.detail;
  const showLive = project.liveUrl && project.status === 'live';
  if (!showLive && !project.githubUrl) return null;

  return (
    <div className={styles.links}>
      {showLive && (
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          {d.visit} <ArrowUpRight />
          <span className="visually-hidden"> {dict.common.opensNew}</span>
        </a>
      )}
      {project.githubUrl && (
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn">
          <Github /> {d.code}
          <span className="visually-hidden"> {dict.common.opensNew}</span>
        </a>
      )}
    </div>
  );
}

function Neighbours({ slug, lang, dict }: { slug: string; lang: Lang; dict: Dictionary }) {
  const { previous, next } = getNeighbours(slug);
  const d = dict.projects.detail;
  if (previous.slug === slug) return null;

  return (
    <nav className={styles.neighbours} aria-label={dict.projects.pageTitle}>
      <Link href={href(lang, `/prosjekter/${previous.slug}`)} rel="prev">
        <span>← {d.previous}</span>
        <strong>{previous.title}</strong>
      </Link>
      <Link href={href(lang, `/prosjekter/${next.slug}`)} rel="next" className={styles.nextLink}>
        <span>{d.next} →</span>
        <strong>{next.title}</strong>
      </Link>
    </nav>
  );
}

export default async function ProjectPage({ params }: PageProps<'/[lang]/prosjekter/[slug]'>) {
  const { lang: rawLang, slug } = await params;
  const lang = resolveLang(rawLang);
  const project = getProject(slug);
  if (!project) notFound();

  const dict = getDictionary(lang);
  const d = dict.projects.detail;
  const details = project.details?.[lang];
  const highlights = project.highlights?.[lang];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description[lang],
    url: `${SITE_URL}${href(lang, `/prosjekter/${project.slug}`)}`,
    author: { '@id': `${SITE_URL}/#person` },
    keywords: project.tags.map((tag) => dict.projects.tags[tag] ?? tag).join(', '),
    ...(project.image ? { image: `${SITE_URL}${project.image}` } : {}),
    ...(project.year ? { dateCreated: project.year } : {}),
  };

  return (
    <>
      <section className="page-hero container">
        <BackLink lang={lang} dict={dict} to="/prosjekter" label={d.back} />
        <p className="eyebrow">{dict.projects.eyebrow}</p>
        <h1>{project.title}</h1>
        <p>{project.description[lang]}</p>
        <Links project={project} dict={dict} />
      </section>

      <section className={`container ${styles.body}`}>
        <div className={styles.media}>
          <ProjectMedia project={project} dict={dict} sizes="(min-width: 1180px) 1100px, 100vw" priority />
        </div>

        <div className={styles.grid}>
          <div className={styles.text}>
            {project.status === 'coming-soon' && <p className={styles.soon}>{d.comingSoon}</p>}

            {details && (
              <>
                <h2>{d.about}</h2>
                {details.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </>
            )}

            {highlights && (
              <>
                <h2>{d.highlights}</h2>
                <ul className={styles.highlights}>
                  {highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <aside className={styles.aside}>
            <Facts project={project} lang={lang} dict={dict} />
            <h2 className={styles.techTitle}>{d.tech}</h2>
            <ul className={styles.tags}>
              {project.tags.map((tag) => (
                <li key={tag}>{dict.projects.tags[tag] ?? tag}</li>
              ))}
            </ul>
          </aside>
        </div>

        <Neighbours slug={project.slug} lang={lang} dict={dict} />
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
    </>
  );
}
