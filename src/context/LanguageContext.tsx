/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState } from 'react';
import generalEn from '../locales/en/general.json';
import generalUk from '../locales/uk/general.json';
import generalDe from '../locales/de/general.json';
import phonesEn from '../locales/en/phones.json';
import phonesUk from '../locales/uk/phones.json';
import phonesDe from '../locales/de/phones.json';
import tabletsEn from '../locales/en/tablets.json';
import tabletsUk from '../locales/uk/tablets.json';
import tabletsDe from '../locales/de/tablets.json';
import accessoriesEn from '../locales/en/accessories.json';
import accessoriesUk from '../locales/uk/accessories.json';
import accessoriesDe from '../locales/de/accessories.json';
import generalPl from '../locales/pl/general.json';
import phonesPl from '../locales/pl/phones.json';
import tabletsPl from '../locales/pl/tablets.json';
import accessoriesPl from '../locales/pl/accessories.json';

export type Language = 'en' | 'uk' | 'de' | 'pl';

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

const translations = {
  en: {
    general: generalEn,
    phones: phonesEn,
    tablets: tabletsEn,
    accessories: accessoriesEn,
  },
  uk: {
    general: generalUk,
    phones: phonesUk,
    tablets: tabletsUk,
    accessories: accessoriesUk,
  },
  de: {
    general: generalDe,
    phones: phonesDe,
    tablets: tabletsDe,
    accessories: accessoriesDe,
  },
  pl: {
    general: generalPl,
    phones: phonesPl,
    tablets: tabletsPl,
    accessories: accessoriesPl,
  },
};

const getNestedValue = (
  obj: Record<string, unknown>,
  path: string,
): unknown => {
  return path.split('.').reduce<unknown>((acc, part) => {
    if (acc && typeof acc === 'object' && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }

    return undefined;
  }, obj);
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('lang');

    if (
      saved === 'en' ||
      saved === 'uk' ||
      saved === 'de' ||
      saved === 'pl'
    ) {
      return saved;
    }

    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('lang', lang);
  };

  const t = (
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

    const langDict = translations[language] || translations.en;
    const nsDict = (langDict[ns as keyof typeof langDict] ||
      langDict.general) as Record<string, unknown>;
    let val = getNestedValue(nsDict, key);

    if (val === undefined) {
      const fallbackLangDict = translations.en;
      const fallbackNsDict = (fallbackLangDict[
        ns as keyof typeof fallbackLangDict
      ] || fallbackLangDict.general) as Record<string, unknown>;

      val = getNestedValue(fallbackNsDict, key);
    }

    if (val === undefined) {
      return key;
    }

    if (typeof val === 'string') {
      if (vars) {
        return Object.entries(vars).reduce((acc, [k, v]) => {
          return acc
            .replace(new RegExp(`\\{\\{${k}\\}\\}`, 'g'), String(v))
            .replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
        }, val);
      }

      return val;
    }

    return val;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
