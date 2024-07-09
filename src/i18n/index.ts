import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { LOCALS } from './constants';
import { uk } from './copies/uk';
import { en } from './copies/en';

const getLanguage = () => {
  return localStorage.getItem('language');
};

const language = getLanguage();

i18n.use(initReactI18next).init({
  resources: {
    [LOCALS.EN]: {
      translation: en,
    },
    [LOCALS.UK]: {
      translation: uk,
    },
  },
  lng: language || 'en',
  fallbackLng: LOCALS.EN,

  interpolation: {
    escapeValue: false,
  },
});
