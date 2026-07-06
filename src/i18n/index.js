//#region imports
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import * as en from './locales/en';
import * as uk from './locales/uk';
import * as pl from './locales/pl';

import { initReactI18next } from 'react-i18next';
//#endregion

const resources = { en, uk, pl };

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    ns: [
      'categories',
      'cart',
      'header',
      'footer',
      'favorites',
      'productPage',
      'productCard',
      'productDetails',
      'homePage',
      'notFoundPage',
      'shared',
    ],
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
