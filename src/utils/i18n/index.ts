import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/translation';
import ua from './locales/ua/translation';

const resources = {
  en: {
    translation: en,
  },
  ua: {
    translation: ua,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ua',

  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
