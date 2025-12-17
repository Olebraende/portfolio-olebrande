import { useState, useEffect } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { setAnalyticsConsent, hasAnalyticsConsent } from '../../utils/analytics';
import styles from '../../styles/modules/CookieConsent.module.css';

const CookieConsent = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    if (!cookieConsent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      // User has made a choice, check if they accepted analytics
      if (hasAnalyticsConsent()) {
        // Analytics consent given, it's already initialized
      }
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setAnalyticsConsent(true); // This initializes GA
    setIsVisible(false);
  };

  const handleAcceptNecessary = () => {
    localStorage.setItem('cookieConsent', 'necessary-only');
    setAnalyticsConsent(false);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.banner}>
        <div className={styles.content}>
          <div className={styles.icon}>
            <i className="bx bx-cookie"></i>
          </div>
          
          <div className={styles.text}>
            <p className={styles.message}>{t.cookies.message}</p>
          </div>
        </div>

        <div className={styles.actions}>
          <button 
            className={styles.necessaryBtn}
            onClick={handleAcceptNecessary}
          >
            {t.cookies.acceptNecessary}
          </button>
          
          <button 
            className={styles.acceptBtn}
            onClick={handleAcceptAll}
          >
            {t.cookies.accept}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;