import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import uk from '../public/locales/uk/translation.json';
import en from '../public/locales/en/translation.json';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'en',

    resources: {
      uk: {
        translation: uk,
      },
      en: {
        translation: en,
      },
    },
  });

export default i18n;
