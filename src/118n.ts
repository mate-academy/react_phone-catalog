import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en-translation.json';
import uaTranslation from './locales/ua-translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      EN: { translation: enTranslation },
      UA: { translation: uaTranslation },
    },
    fallbackLng: 'EN',
    interpolation: { escapeValue: false },
  });

export default i18n;
