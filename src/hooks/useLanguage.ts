import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';

export type Language = 'en' | 'uk';

export const useLanguage = () => {
  const { locale, setLocale } = useContext(LanguageContext);

  return {
    language: locale as Language,
    changeLanguage: (lang: Language) => setLocale(lang),
  };
};
