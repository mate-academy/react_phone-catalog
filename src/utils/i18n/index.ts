import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enLang from './locales/en/homepage.json';
import enNav from './locales/en/navigation.json';
import enCommon from './locales/en/common.json';
import uaLang from './locales/uk/homepage.json';
import uaNav from './locales/uk/navigation.json';
import uaCommon from './locales/uk/common.json';
import { Languages } from '../../types/Languages';

const preferredLanguage = localStorage.getItem('i18nextLng') || Languages.en;

const resources = {
  en: {
    homepage: enLang,
    navigation: enNav,
    common: enCommon,
  },
  uk: {
    homepage: uaLang,
    navigation: uaNav,
    common: uaCommon,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    resources,
    lng: preferredLanguage,
    fallbackLng: 'en',
    ns: ['homepage', 'navigation', 'common'],

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
