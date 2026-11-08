import React, { createContext, useContext, useState } from 'react';

import { translations, TranslationKey, Language } from '../utils/translations';

type LanguageContextType = {
  language: Language;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  toggleLanguage: () => {},
  t: key => translations.en[key],
});

export const LanguageProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');

    return savedLanguage === 'ua' ? 'ua' : 'en';
  });

  const toggleLanguage = () => {
    setLanguage(current => {
      const newLanguage = current === 'en' ? 'ua' : 'en';

      localStorage.setItem('language', newLanguage);

      return newLanguage;
    });
  };

  const t = (key: TranslationKey) => {
    return translations[language][key];
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        toggleLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
