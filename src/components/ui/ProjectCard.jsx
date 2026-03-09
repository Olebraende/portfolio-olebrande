import { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import ProjectModal from './ProjectModal';
import styles from '../../styles/modules/ProjectCard.module.css';

const ProjectCard = ({ project }) => {
  const { language, t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <article
        className={styles.card}
        onClick={() => setIsModalOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setIsModalOpen(true)}
        aria-label={project.title[language]}
      >
        <div className={styles.imageWrapper}>
          <img
            src={project.image}
            alt={project.title[language]}
            className={styles.image}
            loading="lazy"
          />
          <div className={styles.imageOverlay}>
            <i className="bx bx-expand-alt"></i>
          </div>
        </div>

        <div className={styles.content}>
          <h3 className={styles.title}>{project.title[language]}</h3>
          <p className={styles.description}>{project.description[language]}</p>

          <div className={styles.tags}>
            {project.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {t.projects.tags[tag] || tag}
              </span>
            ))}
          </div>

          <span className={styles.viewMore}>
            {language === 'no' ? 'Vis mer' : 'View more'}
            <i className="bx bx-arrow-right"></i>
          </span>
        </div>
      </article>

      {isModalOpen && (
        <ProjectModal
          project={project}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default ProjectCard;
