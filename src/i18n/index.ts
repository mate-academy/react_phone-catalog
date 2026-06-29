import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector'; // 👈 1. Импортируем плагин
import en from './en.json';
import uk from './uk.json';

i18n
  .use(LanguageDetector) // 👈 2. Подключаем плагин к i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      uk: { translation: uk },
    },

    fallbackLng: 'en',

    detection: {
      order: ['localStorage', 'cookie', 'htmlTag'],
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
