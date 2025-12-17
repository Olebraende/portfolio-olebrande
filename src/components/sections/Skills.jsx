import { useLanguage } from '../../hooks/useLanguage';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import Container from '../layout/Container';
import styles from '../../styles/modules/Skills.module.css';

const Skills = () => {
  const { t } = useLanguage();
  const [ref, isVisible] = useScrollAnimation();

  const skills = [
    { name: 'HTML', icon: 'bxl-html5' },
    { name: 'CSS', icon: 'bxl-css3' },
    { name: 'JavaScript', icon: 'bxl-javascript' },
    { name: 'React', icon: 'bxl-react' },
    { name: 'Git', icon: 'bxl-git' },
    { name: 'Figma', icon: 'bxl-figma' },
    { name: 'Node.js', icon: 'bxl-nodejs' },
    { name: 'GitHub', icon: 'bxl-github' },
  ];

  return (
    <section className={styles.skills} id="skills">
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <span className="gradient-text">{t.skills.title}</span>
          </h2>
          <p className={styles.subtitle}>{t.skills.subtitle}</p>
        </div>

        <div 
          ref={ref}
          className={`${styles.skillsGrid} ${isVisible ? styles.visible : ''}`}
        >
          {skills.map((skill) => (
            <div key={skill.name} className={styles.skillCard}>
              <i className={`bx ${skill.icon}`}></i>
              <span>{skill.name}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Skills;