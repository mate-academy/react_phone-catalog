import { createContext, useContext, useState } from 'react';

import { en } from '../translations/en';
import { uk } from '../translations/uk';

type Language = 'en' | 'uk';

const translations = {
  en,
  uk,
};

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: typeof en;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }

  return context;
};
