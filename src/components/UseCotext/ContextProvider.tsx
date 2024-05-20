import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  currentLanguage: string;
  setCurrentLanguage: (v: string) => void;
  changeLanguage: (v: string) => void;
  t: typeof i18next.t;
  language: string;
};

export const CreateContext = React.createContext<ContextType>({
  currentLanguage: '',
  setCurrentLanguage: () => {},
  changeLanguage: () => {},
  t: i18next.t,
  language: '',
});

export const ContextProvider: React.FC<Props> = ({ children }) => {
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
    <CreateContext.Provider value={projectTools}>
      {children}
    </CreateContext.Provider>
  );
};
