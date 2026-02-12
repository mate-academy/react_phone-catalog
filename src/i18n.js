// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files directly
import enTranslation from './locales/en/translation.json';
import ukTranslation from './locales/uk/translation.json';
import deTranslation from './locales/de/translation.json';
import frTranslation from './locales/fr/translation.json';
import esTranslation from './locales/es/translation.json';
import itTranslation from './locales/it/translation.json';
import czTranslation from './locales/cz/translation.json';
import cnTranslation from './locales/cn/translation.json';

const resources = {
  en: {
    translation: enTranslation
  },
  uk: {
    translation: ukTranslation
  },
  de: {
    translation: deTranslation
  },
  fr: {
    translation: frTranslation
  },
  es: {
    translation: esTranslation
  },
  it: {
    translation: itTranslation
  },
  cz: {
    translation: czTranslation
  },
  cn: {
    translation: cnTranslation
  },
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
