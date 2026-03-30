import { ProductCategory } from '../../types/ProductCategory';

export const LINKS = ['home', 'phones', 'tablets', 'accessories'] as const;

export const PRODUCT_CATEGORIES = ['phones', 'tablets', 'accessories'] as const;

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  phones: 'Mobile Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const FOOTER_LINKS = ['github', 'contacts', 'rights'] as const;

export const IMAGES_FOR_BUNNER = [
  './img/banner.png',
  './img/banner.png',
  './img/banner.png',
];

export const IMAGES_FOR_MOBILE_BUNNER = [
  './img/banner-slider.png',
  './img/banner-slider.png',
  './img/banner-slider.png',
];

export const COLOR_MAP: Record<string, string> = {
  black: '#1F2020',
  white: '#F9F6EF',
  red: '#C8092B',
  silver: '#E2E4E1',
  gold: '#F3DBC4',
  yellow: '#F3D060',
  green: '#AEE1CD',
  purple: '#D1CDDA',
  blue: '#276787',

  // iPhone 7 / 8 / XR
  rosegold: '#E6C7C2',
  jetblack: '#0A0A0A',
  coral: '#FF6E59',

  // iPhone X / XS / 11 Pro
  spacegray: '#535150',
  midnightgreen: '#4E5851',

  // iPhone 12 Pro
  graphite: '#5C5B57',
  pacificblue: '#2E4755',

  // iPhone 13 / 13 Pro
  starlight: '#F8F4EE',
  midnight: '#171E27',
  pink: '#FAD2D4',
  sierrablue: '#9BB5CE',
  alpinegreen: '#576856',

  // iPhone 14 Pro
  spaceblack: '#262625',
  deeppurple: '#483C52',
};
