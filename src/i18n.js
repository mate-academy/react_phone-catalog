// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files directly
import enTranslation from './locales/en/translation.json';
import ukTranslation from './locales/uk/translation.json';
import deTranslation from './locales/de/translation.json';

const resources = {
  en: {
    translation: enTranslation
  },
  uk: {
    translation: ukTranslation
  },
  de: {
    translation: deTranslation
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes by default
    }
  });

export default i18n;
