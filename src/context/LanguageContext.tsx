import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import { en } from '../i18n/translations/en';
import { uk } from '../i18n/translations/uk';

type Props = {
  children: ReactNode;
};

type LanguageContextType = {
  language: 'uk' | 'en';
  setLanguage: React.Dispatch<React.SetStateAction<'uk' | 'en'>>;
  texts: typeof en;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider: React.FC<Props> = ({ children }) => {
  const [language, setLanguage] = useState<'uk' | 'en'>(() => {
    const localLanguage = localStorage.getItem('language') as 'uk' | 'en';

    if (localLanguage) {
      return localLanguage;
    } else {
      return 'en';
    }
  });
  const texts = language === 'en' ? en : uk;

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, texts }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
};
