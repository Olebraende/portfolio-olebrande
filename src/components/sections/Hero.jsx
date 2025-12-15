import { useLanguage } from '../../hooks/useLanguage';
import Container from '../layout/Container';
import styles from '../../styles/modules/Hero.module.css';

const Hero = () => {
  const { t } = useLanguage();

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.heroContent}>
          <img 
            src="/pics/pic-ole-1.jpg" 
            alt="Ole Mathias Brænde" 
            className={styles.profileImage}
          />
          
          <div className={styles.infoBox}>
            <h1 className={styles.title}>
              <span className="gradient-text">{t.hero.title}</span>
            </h1>
            
            <h2 className={styles.subtitle}>{t.hero.subtitle}</h2>
            
            <p className={styles.description}>{t.hero.description}</p>
            
            <div className={styles.btnBox}>
              <button 
                className={`${styles.btn} ${styles.btnPrimary}`}
                onClick={scrollToProjects}
              >
                {t.hero.cta1}
              </button>
              
              <a 
                href="https://github.com/Olebraende" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`${styles.btn} ${styles.btnSecondary}`}
              >
                <i className="bx bxl-github"></i>
                {t.hero.githubBtn}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;