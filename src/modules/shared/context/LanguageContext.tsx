import React, { createContext, useContext, useEffect, useMemo } from 'react';
import {
  getPluralForm,
  Language,
  TranslationKey,
  TRANSLATIONS,
} from '@shared/i18n';
import { useLocalStorage } from '@shared/hooks';

type Params = Record<string, string | number>;

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  /** Looks a string up and fills in every `{placeholder}` from `params`. */
  t: (key: TranslationKey, params?: Params) => string;
  /** Picks the plural form of `<key>.one|few|many` for `count`. */
  tCount: (key: string, count: number) => string;
}

const fill = (template: string, params: Params = {}) =>
  Object.entries(params).reduce(
    (result, [name, value]) => result.replaceAll(`{${name}}`, String(value)),
    template,
  );

const LanguageContext = createContext<LanguageContextValue>({
  language: 'en',
  setLanguage: () => {},
  t: key => key,
  tCount: key => key,
});

export const useTranslation = () => useContext(LanguageContext);

interface Props {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<Props> = ({ children }) => {
  const [language, setLanguage] = useLocalStorage<Language>('language', 'en');

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => {
    const dictionary = TRANSLATIONS[language];

    const t = (key: TranslationKey, params?: Params) =>
      fill(dictionary[key] ?? key, params);

    return {
      language,
      setLanguage,
      t,

      tCount: (key: string, count: number) => {
        const form = getPluralForm(language, count);

        return t(`${key}.${form}` as TranslationKey, { count });
      },
    };
  }, [language, setLanguage]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
