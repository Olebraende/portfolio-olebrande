import { useLanguage } from '../../hooks/useLanguage';
import styles from '../../styles/modules/Footer.module.css';

const Footer = () => {
  const { t } = useLanguage();

  const socialLinks = [
    { 
      icon: 'bxl-github', 
      url: 'https://github.com/Olebraende',
      label: 'GitHub'
    },
    { 
      icon: 'bxl-linkedin', 
      url: 'https://www.linkedin.com/in/olebrande/',
      label: 'LinkedIn'
    },
    { 
      icon: 'bx-envelope', 
      url: 'mailto:olembrande.work@gmail.com',
      label: 'Email'
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Left Column - Copyright */}
        <div className={styles.colLeft}>
          <div className={styles.colBox}>
            <i className="bx bx-copyright"></i>
            <span>{t.footer.copyright}</span>
          </div>
        </div>

        {/* Right Column - About & Social */}
        <div className={styles.colRight}>
          <h3 className="gradient-text">{t.footer.aboutTitle}</h3>
          <p>{t.footer.aboutText}</p>
          
          <div className={styles.socialIcons}>
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
              >
                <i className={`bx ${social.icon}`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;