import { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import Container from '../layout/Container';
import ProjectCard from '../ui/ProjectCard';
import { projectsData } from '../../data/projects';
import styles from '../../styles/modules/FeaturedProjects.module.css';

const INITIAL_COUNT = 4;

const FILTERS = [
  { id: 'react', icon: 'bxl-react' },
  { id: 'vanilla', icon: 'bxl-javascript' },
  { id: 'css', icon: 'bxl-css3' },
  { id: 'html', icon: 'bxl-html5' },
  { id: 'design', icon: 'bx-palette' },
  { id: 'ui-ux', icon: 'bx-layer' },
  { id: 'responsive', icon: 'bx-devices' },
  { id: 'accessibility', icon: 'bx-accessibility' },
  { id: 'api', icon: 'bx-code-curly' },
  { id: 'typescript', icon: 'bxl-typescript' },
];

const FeaturedProjects = () => {
  const { t } = useLanguage();
  const [activeFilters, setActiveFilters] = useState(new Set());
  const [showAll, setShowAll] = useState(false);
  const [ref, isVisible] = useScrollAnimation();

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
    setShowAll(false);
  };

  const clearFilters = () => {
    setActiveFilters(new Set());
    setShowAll(false);
  };

  const filteredProjects = activeFilters.size === 0
    ? projectsData
    : projectsData.filter(project =>
        project.tags.some(tag => activeFilters.has(tag))
      );

  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, INITIAL_COUNT);

  const hasMore = filteredProjects.length > INITIAL_COUNT;

  return (
    <section className={styles.projects} id="projects">
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <span className="gradient-text">{t.projects.title}</span>
          </h2>
          <p className={styles.subtitle}>{t.projects.subtitle}</p>
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
          {displayedProjects.map((project, index) => (
            <div
              key={project.id}
              className={styles.cardWrapper}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <ProjectCard
                project={project}
                onTagClick={toggleFilter}
              />
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <p className={styles.noResults}>{t.common.error}</p>
        )}

        {/* Show All / Show Less */}
        {hasMore && (
          <div className={styles.showAllWrapper}>
            <button
              className={styles.showAllBtn}
              onClick={() => setShowAll(prev => !prev)}
            >
              {showAll
                ? t.projects.showLess
                : t.projects.showAll.replace('{count}', filteredProjects.length)}
              <i className={`bx ${showAll ? 'bx-chevron-up' : 'bx-chevron-down'}`}></i>
            </button>
          </div>
        )}
      </Container>
    </section>
  );
};

export default FeaturedProjects;
