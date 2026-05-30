import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { Lang } from '../types/Language';
import { en } from './languages/en';
import { uk } from './languages/uk';

const resources = {
  [Lang.EN]: {
    translation: en,
  },
  [Lang.UK]: {
    translation: uk,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: Lang.EN,

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
