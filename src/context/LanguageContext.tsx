import React, { createContext, useContext, useState } from 'react';

type Lang = 'en' | 'ua';

type LangContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
};

const translations: Record<Lang, Record<string, string>> = {
  en: {
    github: 'GitHub',
    contacts: 'Contacts',
    rights: 'Rights',
    backToTop: 'Back to top',
  },
  ua: {
    github: 'GitHub',
    contacts: 'Контакти',
    rights: 'Права',
    backToTop: 'Нагору',
  },
};

const LanguageContext = createContext<LangContextType | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lang, setLangState] = useState<Lang>(
    (localStorage.getItem('lang') as Lang) || 'en',
  );

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem('lang', newLang);
  };

  const t = (key: string) => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLang must be used within LanguageProvider');
  }

  return context;
};
