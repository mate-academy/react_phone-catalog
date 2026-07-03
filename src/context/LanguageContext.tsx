/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export type Language = 'en' | 'uk' | 'de' | 'pl' | 'es' | 'it' | 'pt';

export const languageList: { value: Language; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'uk', label: 'Українська' },
  { value: 'de', label: 'Deutsch' },
  { value: 'pl', label: 'Polski' },
  { value: 'es', label: 'Español' },
  { value: 'it', label: 'Italiano' },
  { value: 'pt', label: 'Português' },
];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (
    key: string,
    nsOrVariables?: string | Record<string, string | number>,
    variables?: Record<string, string | number>,
  ) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { t: i18nT, i18n } = useTranslation();

  const language = (i18n.language || 'en') as Language;

  const setLanguage = useCallback(
    (lang: Language) => {
      i18n.changeLanguage(lang);
      localStorage.setItem('lang', lang);
    },
    [i18n],
  );

  const t = useCallback(
    (
      key: string,
      nsOrVariables?: string | Record<string, string | number>,
      variables?: Record<string, string | number>,
    ): any => {
      let ns = 'general';
      let vars = variables;

      if (typeof nsOrVariables === 'string') {
        ns = nsOrVariables;
      } else if (nsOrVariables && typeof nsOrVariables === 'object') {
        vars = nsOrVariables;
      }

      const result = i18nT(key, { ns, returnObjects: true, ...vars });

      if (typeof result === 'string' && result === key) {
        return i18nT(key, { ns: 'general', returnObjects: true, ...vars });
      }

      return result;
    },
    [i18nT],
  );

  const contextValue = useMemo(
    () => ({
      language,
      setLanguage,
      t,
    }),
    [language, setLanguage, t],
  );

  return (
    <LanguageContext.Provider value={contextValue}>
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
