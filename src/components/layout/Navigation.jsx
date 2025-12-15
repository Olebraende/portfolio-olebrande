import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import styles from '../../styles/modules/Navigation.module.css';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, language, toggleLanguage } = useLanguage();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Handle scroll for sticky navigation background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}>
      <Link to="/" className={styles.logo} aria-label={t.nav.home}>
        <span className="gradient-text">Portfolio</span>
      </Link>

      <ul className={`${styles.links} ${isMobileMenuOpen ? styles.active : ''}`}>
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? styles.activeLink : ''}
            onClick={closeMobileMenu}
          >
            {t.nav.home}
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/tjenester"
            className={({ isActive }) => isActive ? styles.activeLink : ''}
            onClick={closeMobileMenu}
          >
            {t.nav.services}
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/kontakt"
            className={({ isActive }) => isActive ? styles.activeLink : ''}
            onClick={closeMobileMenu}
          >
            {t.nav.contact}
          </NavLink>
        </li>
      </ul>

      <div className={styles.navActions}>
        {/* Language Toggle */}
        <button 
          className={styles.languageToggle}
          onClick={toggleLanguage}
          aria-label={`Switch to ${language === 'no' ? 'English' : 'Norwegian'}`}
        >
          {language === 'no' ? 'EN' : 'NO'}
        </button>

        {/* Contact Button (hidden on mobile) */}
        <Link to="/kontakt" className={`${styles.btn} ${styles.desktopOnly}`}>
          {t.nav.contact}
        </Link>

        {/* Mobile Menu Icon */}
        <button
          className={styles.menuIcon}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <i className={`bx ${isMobileMenuOpen ? 'bx-x' : 'bx-menu-alt-right'}`}></i>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;