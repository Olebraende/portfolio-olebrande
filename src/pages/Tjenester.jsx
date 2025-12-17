import { useLanguage } from '../hooks/useLanguage';
import { usePageMeta } from '../utils/usePageMeta';
import { Link } from 'react-router-dom';
import Container from '../components/layout/Container';
import ServiceCard from '../components/ui/ServiceCard';
import styles from '../styles/modules/Tjenester.module.css';

const Tjenester = () => {
  const { t, language } = useLanguage();
  
  // Set page meta tags
  usePageMeta(
    `${t.services.title} | Ole Brænde`,
    language === 'no'
      ? 'Webutvikling, hosting og vedlikehold av moderne webløsninger. Profesjonelle tjenester for ditt digitale prosjekt.'
      : 'Web development, hosting and maintenance of modern web solutions. Professional services for your digital project.'
  );

  const services = [
    {
      icon: 'bx-code-alt',
      title: t.services.webDev.title,
      description: t.services.webDev.description,
      features: t.services.webDev.features,
    },
    {
      icon: 'bx-server',
      title: t.services.hosting.title,
      description: t.services.hosting.description,
      features: t.services.hosting.features,
    },
    {
      icon: 'bx-wrench',
      title: t.services.maintenance.title,
      description: t.services.maintenance.description,
      features: t.services.maintenance.features,
    },
  ];

  return (
    <div className={styles.tjenester}>
      <section className={styles.hero}>
        <Container>
          <h1 className={styles.title}>
            <span className="gradient-text">{t.services.title}</span>
          </h1>
          <p className={styles.subtitle}>{t.services.subtitle}</p>
        </Container>
      </section>

      <section className={styles.servicesSection}>
        <Container>
          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                features={service.features}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className={styles.cta}>
        <Container>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>{t.services.cta}</h2>
            <Link to="/kontakt" className={styles.ctaButton}>
              {t.nav.contact}
              <i className="bx bx-right-arrow-alt"></i>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Tjenester;