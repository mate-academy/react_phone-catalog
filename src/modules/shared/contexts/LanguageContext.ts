import { createContext } from 'react';

type LanguageContextType = {
  locale: string;
  setLocale: (locale: string) => void;
};

export const LanguageContext = createContext<LanguageContextType>({
  locale: 'en',
  setLocale: () => {},
});
