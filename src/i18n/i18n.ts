import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Language } from '../enums/Language';

import en from './locales/en.json';
import ua from './locales/ua.json';

const fallbackLang =
  (localStorage.getItem('appLanguage') as Language) || Language.EN;

const resources = {
  en: {
    translation: en,
  },
  ua: {
    translation: ua,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: fallbackLang,
  pluralSeparator: '_',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
