import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { usePageMeta } from '../utils/usePageMeta';
import Container from '../components/layout/Container';
import styles from '../styles/modules/NotFound.module.css';

const NotFound = () => {
  const { language } = useLanguage();

  usePageMeta(
    language === 'no' ? '404 – Side ikke funnet | Ole Mathias Brænde' : '404 – Page not found | Ole Mathias Brænde',
    ''
  );

  return (
    <section className={styles.page}>
      <Container>
        <div className={styles.content}>
          <p className={styles.code}>404</p>
          <h1 className={styles.title}>
            {language === 'no' ? 'Siden finnes ikke' : 'Page not found'}
          </h1>
          <p className={styles.description}>
            {language === 'no'
              ? 'Siden du leter etter eksisterer ikke eller har blitt flyttet.'
              : 'The page you are looking for does not exist or has been moved.'}
          </p>
          <Link to="/" className={styles.btn}>
            <i className="bx bx-arrow-back"></i>
            {language === 'no' ? 'Tilbake til hjem' : 'Back to home'}
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default NotFound;
