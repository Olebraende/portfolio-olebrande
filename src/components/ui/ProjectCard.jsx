import { useLanguage } from '../../hooks/useLanguage';
import styles from '../../styles/modules/ProjectCard.module.css';

const ProjectCard = ({ project }) => {
  const { language, t } = useLanguage();

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img 
          src={project.image} 
          alt={project.title[language]} 
          className={styles.image}
          loading="lazy"
        />
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{project.title[language]}</h3>
        <p className={styles.description}>{project.description[language]}</p>
        
        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {t.projects.tags[tag]}
            </span>
          ))}
        </div>
        
        <a 
          href={project.liveUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.btn}
        >
          {t.projects.viewLive}
          <i className="bx bx-link-external"></i>
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;