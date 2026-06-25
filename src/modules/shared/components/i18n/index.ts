import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from '../locales/en.json';
import ua from '../locales/ua.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ua: { translation: ua },
    },
    fallbackLng: 'en',
    detection: {
      convertDetectedLanguage: lng => (lng.startsWith('uk') ? 'ua' : lng),

      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
