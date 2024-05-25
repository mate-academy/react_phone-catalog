import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { ContextLangType } from '../types/ContextType/ContextLangType';
import { Props } from '../types/ContextType/Props';

export const LanguageContext = React.createContext<ContextLangType>({
  currentLanguage: '',
  setCurrentLanguage: () => {},
  changeLanguage: () => {},
  t: i18next.t,
  language: '',
});

export const LanguageProvider: React.FC<Props> = ({ children }) => {
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState(language);

  const projectTools = {
    currentLanguage,
    setCurrentLanguage,
    changeLanguage,
    t,
    language,
  };

  return (
    <LanguageContext.Provider value={projectTools}>
      {children}
    </LanguageContext.Provider>
  );
};
