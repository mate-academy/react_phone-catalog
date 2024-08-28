import React, { useContext, useEffect, useState } from 'react';
import { Language } from '../../types/enums';
import { useLocalStorage } from '../../hooks/useLocalStorage';

type LocaleTexts = { [key: string]: string };

type HandleLanguageChange = (newLanguage: Language) => void;

type LanguageContextValue = {
  localeTexts: LocaleTexts;
  language: Language;
  handleLanguageChange: HandleLanguageChange;
};

const LanguageContext = React.createContext<LanguageContextValue | null>(null);

type Props = React.PropsWithChildren;

const getBrowserLanguage = (): Language => {
  const { languages, language } = navigator;
  const browserLanguages = languages || [language] || [Language.English];

  for (const browserLanguage of browserLanguages.map(
    languageToMap => languageToMap.trim().split(/-|_/)[0],
  )) {
    if (Object.values(Language).includes(browserLanguage as Language)) {
      return browserLanguage as Language;
    }
  }

  return Language.English;
};

export const LanguageProvider = ({ children }: Props) => {
  const [language, setLanguage] = useLocalStorage<Language>(
    'language',
    getBrowserLanguage(),
  );
  const [localeTexts, setLocaleTexts] = useState<LocaleTexts>({});

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  const fetchLocaleTexts = async (languageToFetch: Language) => {
    try {
      const response = await fetch(`locales/${languageToFetch}.json`);

      if (!response.ok) {
        throw new Error(`An error has occured: ${response.status}`);
      }

      setLocaleTexts(await response.json());
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchLocaleTexts(language);
  }, [language]);

  const value = {
    localeTexts,
    language,
    handleLanguageChange,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const value = useContext(LanguageContext);

  if (!value) {
    throw new Error('LanguageProvider is missing!!!');
  }

  return value;
};
