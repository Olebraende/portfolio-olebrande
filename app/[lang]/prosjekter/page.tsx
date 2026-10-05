import type { Metadata } from 'next';
import { alternates, getDictionary, resolveLang } from '@/lib/i18n';
import { projects } from '@/lib/projects';
import ProjectsGrid from '@/components/ProjectsGrid';

export async function generateMetadata({ params }: PageProps<'/[lang]/prosjekter'>): Promise<Metadata> {
  const lang = resolveLang((await params).lang);
  const dict = getDictionary(lang);
  return {
    title: dict.meta.projectsTitle,
    description: dict.meta.projectsDescription,
    alternates: alternates(lang, '/prosjekter'),
    openGraph: { title: dict.meta.projectsTitle, description: dict.meta.projectsDescription },
  };
}

export default async function ProjectsPage({ params }: PageProps<'/[lang]/prosjekter'>) {
  const lang = resolveLang((await params).lang);
  const dict = getDictionary(lang);

  return (
    <>
      <section className="page-hero container">
        <p className="eyebrow">{dict.projects.eyebrow}</p>
        <h1>{dict.projects.pageTitle}</h1>
        <p>{dict.projects.pageSubtitle}</p>
      </section>
      <section className="container" style={{ paddingBottom: 'clamp(4rem, 8vw, 7rem)' }}>
        <ProjectsGrid projects={projects} lang={lang} dict={dict} />
      </section>
    </>
  );
}
