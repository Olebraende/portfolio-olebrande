import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { usePageMeta } from '../utils/usePageMeta';
import Container from '../components/layout/Container';
import ProjectCard from '../components/ui/ProjectCard';
import { projectsData } from '../data/projects';
import styles from '../styles/modules/Prosjekter.module.css';

// Icon mapping – add new tags here when needed
const TAG_ICONS = {
  react: 'bxl-react',
  vanilla: 'bxl-javascript',
  css: 'bxl-css3',
  html: 'bxl-html5',
  design: 'bx-palette',
  'ui-ux': 'bx-layer',
  responsive: 'bx-devices',
  accessibility: 'bx-accessibility',
  api: 'bx-code-curly',
  typescript: 'bxl-typescript',
};

// Derive available filters from actual project data (only tags in use appear)
const usedTags = [...new Set(projectsData.flatMap(p => p.tags))];
const FILTERS = Object.keys(TAG_ICONS)
  .filter(id => usedTags.includes(id))
  .map(id => ({ id, icon: TAG_ICONS[id] }));

const Prosjekter = () => {
  const { language, t } = useLanguage();
  const [activeFilters, setActiveFilters] = useState(new Set());
  const [ref, isVisible] = useScrollAnimation();

  usePageMeta(
    language === 'no'
      ? 'Prosjekter | Ole Mathias Brænde'
      : 'Projects | Ole Mathias Brænde',
    language === 'no'
      ? 'Se alle prosjekter av Ole Mathias Brænde – webapplikasjoner, nettsider og mer.'
      : 'View all projects by Ole Mathias Brænde – web applications, websites, and more.'
  );

  const toggleFilter = (filterId) => {
    setActiveFilters(prev => {
      const next = new Set(prev);
      if (next.has(filterId)) {
        next.delete(filterId);
      } else {
        next.add(filterId);
      }
      return next;
    });
  };

  const clearFilters = () => setActiveFilters(new Set());

  const filteredProjects = activeFilters.size === 0
    ? projectsData
    : projectsData.filter(project =>
        project.tags.some(tag => activeFilters.has(tag))
      );

  return (
    <section className={styles.page}>
      <Container>
        <Link to="/" className={styles.backBtn}>
          <i className="bx bx-arrow-back"></i>
          {language === 'no' ? 'Tilbake' : 'Back'}
        </Link>

        <div className={styles.header}>
          <h1 className={styles.title}>
            <span className="gradient-text">{t.projects.pageTitle}</span>
          </h1>
          <p className={styles.subtitle}>{t.projects.pageSubtitle}</p>
        </div>

        {/* Filter Chips */}
        <div className={styles.filtersWrapper}>
          <div className={styles.filters}>
            <button
              className={`${styles.filterChip} ${activeFilters.size === 0 ? styles.active : ''}`}
              onClick={clearFilters}
            >
              <i className="bx bx-grid-alt"></i>
              <span>{t.projects.filterAll}</span>
            </button>
            {FILTERS.map((filter) => (
              t.projects.tags[filter.id] && (
                <button
                  key={filter.id}
                  className={`${styles.filterChip} ${activeFilters.has(filter.id) ? styles.active : ''}`}
                  onClick={() => toggleFilter(filter.id)}
                >
                  <i className={`bx ${filter.icon}`}></i>
                  <span>{t.projects.tags[filter.id]}</span>
                </button>
              )
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div
          ref={ref}
          className={`${styles.projectsGrid} ${isVisible ? styles.visible : ''}`}
        >
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={styles.cardWrapper}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <ProjectCard project={project} onTagClick={toggleFilter} />
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <p className={styles.noResults}>{t.common.error}</p>
        )}
      </Container>
    </section>
  );
};

export default Prosjekter;
