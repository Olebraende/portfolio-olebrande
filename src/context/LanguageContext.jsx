import { useState, useEffect } from 'react';
import { LanguageContext } from './LanguageContextExport';
import { no } from '../locales/no';
import { en } from '../locales/en';

export const LanguageProvider = ({ children }) => {
  // Get initial language from localStorage or default to Norwegian
  const getInitialLanguage = () => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'no';
  };

  const [language, setLanguage] = useState(getInitialLanguage);

  // Translations object
  const translations = {
    no,
    en,
  };

  // Get current translations
  const t = translations[language];

  // Toggle language
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'no' ? 'en' : 'no'));
  };

  // Update HTML lang attribute and localStorage when language changes
  useEffect(() => {
    // Update HTML lang attribute for accessibility and SEO
    document.documentElement.lang = language;
    
    // Persist language preference
    localStorage.setItem('language', language);
  }, [language]);

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};