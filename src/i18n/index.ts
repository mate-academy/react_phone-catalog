import { initReactI18next } from 'react-i18next';

import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationsInEng from '@locales/en/en.json';
import translationsInFrance from '@locales/fr/fr.json';
import translationsInUkrainian from '@locales/uk/uk.json';

import { LOCALS } from '@utils/constants/codeLang';

const resources = {
  [LOCALS.EN]: {
    translation: translationsInEng,
  },
  [LOCALS.UK]: {
    translation: translationsInUkrainian,
  },
  [LOCALS.FR]: {
    translation: translationsInFrance,
  },
};

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    debug: process.env.NODE_ENV === 'development',
    fallbackLng: localStorage.getItem('i18nextLng') || LOCALS.EN,
    returnObjects: true,
    interpolation: {
      escapeValue: false,
    },
    ns: 'translation',
    defaultNS: 'translation',
    pluralSeparator: '_',
  });

export default i18next;
