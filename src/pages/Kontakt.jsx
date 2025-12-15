import { useLanguage } from '../hooks/useLanguage';
import { usePageMeta } from '../utils/usePageMeta';

const Kontakt = () => {
  const { t, language } = useLanguage();
  
  // Set page meta tags
  usePageMeta(
    `${t.contact.title} | Ole Brænde`,
    language === 'no'
      ? 'Ta kontakt for et uforpliktende tilbud. Jeg hjelper deg med webutvikling, hosting og vedlikehold.'
      : 'Get in touch for a no-obligation quote. I help you with web development, hosting and maintenance.'
  );

  return (
    <div style={{ minHeight: '80vh', padding: '4rem 2rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
        <span className="gradient-text">{t.contact.title}</span>
      </h1>
      <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>
        Coming in Phase 3... (Contact form with Netlify Forms)
      </p>
    </div>
  );
};

export default Kontakt;