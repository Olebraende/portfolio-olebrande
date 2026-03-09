import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import Container from '../layout/Container';
import ProjectCard from '../ui/ProjectCard';
import { projectsData } from '../../data/projects';
import styles from '../../styles/modules/FeaturedProjects.module.css';

const featuredProjects = projectsData.slice(0, 3);

const FeaturedProjects = () => {
  const { t } = useLanguage();
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section className={styles.projects} id="projects">
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <span className="gradient-text">{t.projects.title}</span>
          </h2>
          <p className={styles.subtitle}>{t.projects.subtitle}</p>
        </div>

        <div
          ref={ref}
          className={`${styles.projectsGrid} ${isVisible ? styles.visible : ''}`}
        >
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className={styles.cardWrapper}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <Link to="/prosjekter" className={styles.ctaBtn}>
            {t.projects.viewAll}
            <i className="bx bx-arrow-right"></i>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProjects;
