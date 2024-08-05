import i18n from 'i18next';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enLang from './locales/en/en.json';
import ukLang from './locales/uk/uk.json';
import { Lang } from '../../types/Languages';

const resources = {
  [Lang.EN]: {
    translation: enLang,
  },
  [Lang.UK]: {
    translation: ukLang,
  },
};

i18n
  .use(intervalPlural)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: Lang.UK,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
