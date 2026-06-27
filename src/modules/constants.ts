export const BASE_URL =
  import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL;
export const SLIDER_COUNT = 8;
export const CURRENCY_SYMBOL = `$`;
export const HOME_SLIDER_TIME = 5000;
export const HOME_CATEGORIES_LIST = ['phones', 'tablets', 'accessories'];

export const DETAIL_SPECS_LIST = ['screen', 'resolution', 'processor', 'ram'];
export const TECH_SPECS_LIST = [
  'screen',
  'resolution',
  'processor',
  'capacity',
  'ram',
  'camera',
  'zoom',
  'cell',
];
export const CATALOG_SPECS_LIST = ['screen', 'capacity', 'ram'];

export const APPLE_COLORS: Record<string, string> = {
  spacegray: '#4A4A4A',
  midnight: '#191970',
  starlight: '#E3C565',
  silver: '#C0C0C0',
  gold: '#FFD700',
  rosegold: '#B76E79',
  graphite: '#4C4A46',
  sierrablue: '#7396B0',
};

export const siteLanguages = {
  uk: 'UA',
  en: 'EN',
};

export const DEBOUNCED_DELAY = 600;
