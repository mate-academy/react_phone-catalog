import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ENarticle from './locales/en/ENarticle.json';
import ENcart from './locales/en/ENcart.json';
import ENcatalogPages from './locales/en/ENcatalogPages.json';
import ENfooter from './locales/en/ENfooter.json';
import ENhomePage from './locales/en/ENhomePage.json';
import ENinfoProduct from './locales/en/ENinfoProduct.json';
import ENnavBar from './locales/en/ENnavBar.json';

import UKarticle from './locales/uk/UKarticle.json';
import UKcartFavourites from './locales/uk/UKcartFavourites.json';
import UKcatalogPages from './locales/uk/UKcatalogPages.json';
import UKfooter from './locales/uk/UKfooter.json';
import UKhomePage from './locales/uk/UKhomePage.json';
import UKinfoProduct from './locales/uk/UKinfoProduct.json';
import UKnavBar from './locales/uk/UKnavBar.json';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: {
        ...ENarticle,
        ...ENcart,
        ...ENcatalogPages,
        ...ENfooter,
        ...ENhomePage,
        ...ENinfoProduct,
        ...ENnavBar,
      },
    },
    uk: {
      translation: {
        ...UKarticle,
        ...UKcartFavourites,
        ...UKcatalogPages,
        ...UKfooter,
        ...UKhomePage,
        ...UKinfoProduct,
        ...UKnavBar,
      },
    },
  },
});

export default i18n;
