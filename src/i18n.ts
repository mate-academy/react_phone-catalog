import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '../public/locales/en/translation.json';
import de from '../public/locales/de/translation.json';
import ua from '../public/locales/ua/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      de: {
        translation: de,
      },
      ua: {
        translation: ua,
      },
    },

    fallbackLng: 'en',

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
