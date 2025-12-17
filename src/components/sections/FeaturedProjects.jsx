import { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import Container from '../layout/Container';
import ProjectCard from '../ui/ProjectCard';
import { projectsData } from '../../data/projects';
import styles from '../../styles/modules/FeaturedProjects.module.css';

const FeaturedProjects = () => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [ref, isVisible] = useScrollAnimation();

  const filters = [
    { id: 'all', label: t.projects.filterAll },
    { id: 'react', label: t.projects.filterReact },
    { id: 'vanilla', label: t.projects.filterVanilla },
    { id: 'design', label: t.projects.filterDesign },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projectsData
    : projectsData.filter(project => project.tags.includes(activeFilter));

  return (
    <section className={styles.projects} id="projects">
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <span className="gradient-text">{t.projects.title}</span>
          </h2>
          <p className={styles.subtitle}>{t.projects.subtitle}</p>
        </div>

        {/* Filter Buttons */}
        <div className={styles.filters}>
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`${styles.filterBtn} ${activeFilter === filter.id ? styles.active : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div 
          ref={ref}
          className={`${styles.projectsGrid} ${isVisible ? styles.visible : ''}`}
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Show message if no projects match filter */}
        {filteredProjects.length === 0 && (
          <p className={styles.noResults}>
            {t.common.error}
          </p>
        )}
      </Container>
    </section>
  );
};

export default FeaturedProjects;