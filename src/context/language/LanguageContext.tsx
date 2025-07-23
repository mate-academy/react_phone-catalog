import { createContext } from 'react';

export type Language = 'en' | 'ua';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);
