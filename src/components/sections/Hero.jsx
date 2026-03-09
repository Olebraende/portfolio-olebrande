import { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import useCountUp from '../../hooks/useCountUp';
import { projectsData } from '../../data/projects';
import Container from '../layout/Container';
import Typewriter from '../ui/Typewriter';
import styles from '../../styles/modules/Hero.module.css';

// Months of experience since September 2024
const startDate = new Date(2024, 8, 1); // September 2024
const now = new Date();
const monthsExperience = (now.getFullYear() - startDate.getFullYear()) * 12
  + (now.getMonth() - startDate.getMonth());

const Hero = () => {
  const { t, language } = useLanguage();
  const [titleComplete, setTitleComplete] = useState(false);
  const [projectCount, statsRef] = useCountUp(projectsData.length);
  const [months] = useCountUp(monthsExperience);

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
            loading="eager"
          />

          <div className={styles.infoBox}>
            <h1 className={styles.title}>
              <span className="gradient-text">
                <Typewriter
                  text={t.hero.title}
                  speed={80}
                  onComplete={() => setTitleComplete(true)}
                />
              </span>
            </h1>

            <h2 className={styles.subtitle}>
              {titleComplete && (
                <Typewriter text={t.hero.subtitle} speed={60} />
              )}
            </h2>

            <p className={styles.description}>{t.hero.description}</p>

            <div className={styles.stats} ref={statsRef}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>{projectCount}</span>
                <span className={styles.statLabel}>
                  {language === 'no' ? 'Prosjekter' : 'Projects'}
                </span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statNumber}>{months}+</span>
                <span className={styles.statLabel}>
                  {language === 'no' ? 'Mnd. erfaring' : 'Mo. experience'}
                </span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statNumber}>100%</span>
                <span className={styles.statLabel}>
                  {language === 'no' ? 'Dedikasjon' : 'Dedication'}
                </span>
              </div>
            </div>

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
