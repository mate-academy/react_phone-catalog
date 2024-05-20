import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enJSON from './components/locale/en.json';
import uaJSON from './components/locale/ua.json';
i18n.use(initReactI18next).init({
  resources: {
    en: { ...enJSON },
    ua: { ...uaJSON },
  }, // Where we're gonna put translations' files
  lng: 'en', // Set the initial language of the App
});
