import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en.json';
import translationUK from './locales/uk.json';

const resources = {
  en: {
    translation: translationEN,
  },
  uk: {
    translation: translationUK,
  },
};

i18n
  .use(LanguageDetector) // Автоматично детектує мову користувача та пише в localStorage
  .use(initReactI18next) // Інтегрує i18next з React
  .init({
    resources,
    fallbackLng: 'en', // Якщо мова не розпізнана — вмикаємо англійську
    interpolation: {
      escapeValue: false, // React сам захищає від XSS атак
    },
    detection: {
      order: ['localStorage', 'navigator'], // Спочатку шукаємо в localStorage, потім в браузері
      caches: ['localStorage'], // Зберігаємо вибір користувача
    },
  });

export default i18n;
