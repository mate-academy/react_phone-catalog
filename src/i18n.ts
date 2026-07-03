import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import generalEn from './locales/en/general.json';
import generalUk from './locales/uk/general.json';
import generalDe from './locales/de/general.json';
import generalPl from './locales/pl/general.json';
import generalEs from './locales/es/general.json';
import generalIt from './locales/it/general.json';

import phonesEn from './locales/en/phones.json';
import phonesUk from './locales/uk/phones.json';
import phonesDe from './locales/de/phones.json';
import phonesPl from './locales/pl/phones.json';
import phonesEs from './locales/es/phones.json';
import phonesIt from './locales/it/phones.json';

import tabletsEn from './locales/en/tablets.json';
import tabletsUk from './locales/uk/tablets.json';
import tabletsDe from './locales/de/tablets.json';
import tabletsPl from './locales/pl/tablets.json';
import tabletsEs from './locales/es/tablets.json';
import tabletsIt from './locales/it/tablets.json';

import accessoriesEn from './locales/en/accessories.json';
import accessoriesUk from './locales/uk/accessories.json';
import accessoriesDe from './locales/de/accessories.json';
import accessoriesPl from './locales/pl/accessories.json';
import accessoriesEs from './locales/es/accessories.json';
import accessoriesIt from './locales/it/accessories.json';

const resources = {
  en: {
    general: generalEn,
    phones: phonesEn,
    tablets: tabletsEn,
    accessories: accessoriesEn,
  },
  uk: {
    general: generalUk,
    phones: phonesUk,
    tablets: tabletsUk,
    accessories: accessoriesUk,
  },
  de: {
    general: generalDe,
    phones: phonesDe,
    tablets: tabletsDe,
    accessories: accessoriesDe,
  },
  pl: {
    general: generalPl,
    phones: phonesPl,
    tablets: tabletsPl,
    accessories: accessoriesPl,
  },
  es: {
    general: generalEs,
    phones: phonesEs,
    tablets: tabletsEs,
    accessories: accessoriesEs,
  },
  it: {
    general: generalIt,
    phones: phonesIt,
    tablets: tabletsIt,
    accessories: accessoriesIt,
  },
};

const savedLang = localStorage.getItem('lang') || 'en';

i18n.use(initReactI18next).init({
  resources,
  lng: savedLang,
  fallbackLng: 'en',
  defaultNS: 'general',
  interpolation: {
    escapeValue: false, // react already safes from xss
    prefix: '{', // To support our current {variable} syntax in json files
    suffix: '}',
  },
});

export default i18n;
