import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en/translation.json';
import ukTranslation from './locales/uk/translation.json';
import etTranslation from './locales/et/translation.json';
import ruTranslation from './locales/ru/translation.json';

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    detection: {
      order: ['queryString', 'cookie'],
    },
    resources: {
      en: { translation: enTranslation },
      uk: { translation: ukTranslation },
      et: { translation: etTranslation },
      ru: { translation: ruTranslation },
    },
  });

export default i18next;
