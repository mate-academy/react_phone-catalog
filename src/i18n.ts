import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const baseUrl = import.meta.env.BASE_URL || '/';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: `${baseUrl}locales/{{lng}}/{{ns}}.json`,
    },

    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },

    fallbackLng: 'en',
    debug: false, //Змініть на true під час розробки для дебагу в консолі

    react: {
      useSuspense: false, // Щоб уникнути використання React.Suspense, якщо ви його не налаштували
    },

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    ns: [
      'accessoriespage',
      'breadcrumb',
      'buttonmain',
      'cartpage',
      'checkoutmodal',
      'contactsuspage',
      'favouritespage',
      'footer',
      'header',
      'homepage',
      'notfoundpage',
      'phonepage',
      'productcard',
      'productdetails',
      'productslist',
      'rightspage',
      'shopbycategory',
      'tabletpage',
      'unicorn',
    ],
  });

export default i18n;
