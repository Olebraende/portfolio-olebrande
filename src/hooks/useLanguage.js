import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContextExport';

/**
 * Custom hook to access language context
 * Must be used within a LanguageProvider
 */
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};