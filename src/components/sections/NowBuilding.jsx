import { useLanguage } from '../../hooks/useLanguage';
import Container from '../layout/Container';
import styles from '../../styles/modules/NowBuilding.module.css';

const NowBuilding = () => {
  const { t } = useLanguage();

  const techStack = ['React', 'Vite', 'CSS Modules', 'React Router', 'Node.js'];

  return (
    <section className={styles.nowBuilding}>
      <Container>
        <div className={styles.content}>
          <div className={styles.badge}>
            <i className="bx bx-code-curly"></i>
            <span>{t.nowBuilding.title}</span>
          </div>
          
          <h3 className={styles.title}>
            <span className="gradient-text">{t.nowBuilding.subtitle}</span>
          </h3>
          
          <p className={styles.description}>{t.nowBuilding.description}</p>
          
          <div className={styles.techStack}>
            <span className={styles.techLabel}>{t.nowBuilding.techStack}</span>
            <div className={styles.techTags}>
              {techStack.map((tech) => (
                <span key={tech} className={styles.techTag}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default NowBuilding;