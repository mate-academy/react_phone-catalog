// eslint-disable-next-line max-len
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import i18n from '../118n';

type Language = 'EN' | 'UA';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
};

// eslint-disable-next-line max-len
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(
    (localStorage.getItem('language') as Language) || 'EN',
  );

  const setLanguage = (lng: Language) => {
    setLanguageState(lng);
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'EN' ? 'UA' : 'EN');
  };

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);

  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }

  return ctx;
};
