import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './translations/en';
import uk from './translations/uk';
import { LanguageType } from '../types/Language';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      [LanguageType.EN]: { translation: en },
      [LanguageType.UK]: { translation: uk },
    },
    fallbackLng: LanguageType.EN,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
