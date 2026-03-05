import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from '../locales/translation-en.json';
import translationUA from '../locales/translation-ua.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEN },
      uk: { translation: translationUA },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'uk'],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
