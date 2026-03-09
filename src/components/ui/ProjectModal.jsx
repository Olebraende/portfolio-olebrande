import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../../hooks/useLanguage';
import styles from '../../styles/modules/ProjectModal.module.css';

const ProjectModal = ({ project, onClose }) => {
  const { language, t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return createPortal(
    <div
      className={styles.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label={language === 'no' ? 'Lukk' : 'Close'}
        >
          <i className="bx bx-x"></i>
        </button>

        <div className={styles.imageWrapper}>
          <img
            src={project.image}
            alt={project.title[language]}
            className={styles.image}
          />
        </div>

        <div className={styles.content}>
          <div className={styles.tags}>
            {project.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {t.projects.tags[tag] || tag}
              </span>
            ))}
          </div>

          <h2 id="modal-title" className={styles.title}>
            {project.title[language]}
          </h2>

          <p className={styles.description}>
            {project.description[language]}
          </p>

          <div className={styles.buttons}>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnPrimary}
            >
              {t.projects.viewLive}
              <i className="bx bx-link-external"></i>
            </a>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnSecondary}
              >
                {t.projects.viewCode}
                <i className="bx bxl-github"></i>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProjectModal;
