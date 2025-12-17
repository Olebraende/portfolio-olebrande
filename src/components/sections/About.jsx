import { useLanguage } from '../../hooks/useLanguage';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import Container from '../layout/Container';
import styles from '../../styles/modules/About.module.css';

const About = () => {
  const { t } = useLanguage();
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section className={styles.about} id="about">
      <Container>
        <h2 className={styles.title}>
          <span className="gradient-text">{t.about.title}</span>
        </h2>
        
        <div 
          ref={ref}
          className={`${styles.content} ${isVisible ? styles.visible : ''}`}
        >
          <p>{t.about.text1}</p>
          <p>{t.about.text2}</p>
          <p>{t.about.text3}</p>
        </div>
      </Container>
    </section>
  );
};

export default About;