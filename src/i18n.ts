import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

const isGithubPages = window.location.hostname === 'vitalii120296.github.io';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false, // не потрібно для React
    },
    backend: {
      loadPath: isGithubPages
        ? '/react_phone-catalog/locales/{{lng}}/{{ns}}.json' // для GitHub Pages
        : '/locales/{{lng}}/{{ns}}.json', // для локального середовища
    },
  });

export default i18n;
