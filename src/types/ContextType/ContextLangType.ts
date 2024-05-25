import i18next from 'i18next';

export type ContextLangType = {
  currentLanguage: string;
  setCurrentLanguage: (v: string) => void;
  changeLanguage: (v: string) => void;
  t: typeof i18next.t;
  language: string;
};
