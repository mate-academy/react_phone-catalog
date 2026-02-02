import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/translation';
import ua from './locales/ua/translation';

export const LANGUAGE_STORAGE_KEY = 'language';

type Language = 'en' | 'ua';

const getInitialLanguage = (): Language => {
  const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);

  if (saved === 'en' || saved === 'ua') {
    return saved;
  }

  return 'ua';
};

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
  lng: getInitialLanguage(),

  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

i18n.on('languageChanged', lng => {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, lng);
});

export default i18n;
