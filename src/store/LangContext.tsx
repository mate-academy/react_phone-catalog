import React, { useEffect, useState } from 'react';
import { LANG } from '../constants/lang';
import { LOCAL_STORAGE_KEYS } from '../constants/localeStorage';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

export type Lang = (typeof LANG)[keyof typeof LANG];

type LangContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

export const LangContext = React.createContext<LangContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

export const LangContextProvider: React.FC<Props> = ({ children }) => {
  const [lang, setLang] = useState<Lang>(() =>
    getFromLocalStorage(LOCAL_STORAGE_KEYS.language, LANG.en),
  );

  useEffect(() => {
    saveToLocalStorage(LOCAL_STORAGE_KEYS.language, lang);
  }, [lang]);

  const value = {
    lang,
    setLang,
  };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
};
