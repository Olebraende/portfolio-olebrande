import { useLanguage } from '../hooks/useLanguage';
import { usePageMeta } from '../utils/usePageMeta';

const Tjenester = () => {
  const { t, language } = useLanguage();
  
  // Set page meta tags
  usePageMeta(
    `${t.services.title} | Ole Brænde`,
    language === 'no'
      ? 'Webutvikling, hosting og vedlikehold av moderne webløsninger. Profesjonelle tjenester for ditt digitale prosjekt.'
      : 'Web development, hosting and maintenance of modern web solutions. Professional services for your digital project.'
  );

  return (
    <div style={{ minHeight: '80vh', padding: '4rem 2rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
        <span className="gradient-text">{t.services.title}</span>
      </h1>
      <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>
        Coming in Phase 3... (Services page content)
      </p>
    </div>
  );
};

export default Tjenester;