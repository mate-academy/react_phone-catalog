import i18n, { type InitOptions, type Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en/common.json';
import uk from './locales/uk/common.json';

const resources: Resource = {
  en: { common: en },
  uk: { common: uk },
};

const i18nConfig = {
  resources,
  lng: 'en',
  fallbackLng: 'en',
  supportedLngs: ['en', 'uk'],
  ns: ['common'],
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
  detection: {
    order: ['localStorage', 'cookie', 'navigator'],
    caches: ['localStorage'],
  },
} as InitOptions;

i18n.use(LanguageDetector).use(initReactI18next);

void i18n.init(i18nConfig);

export default i18n;
