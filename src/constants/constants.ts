export const LINK_TO = {
  HOME: '/',
  PHONES: '/phones',
  TABLETS: '/tablets',
  ACCESSORIES: '/accessories',
  FAVORITES: '/favorites',
  SHOP: '/shop',
};

export type LinkToKeys = keyof typeof LINK_TO;

export const CATEGORIES = {
  PHONES: 'phones',
  TABLETS: 'tablets',
  ACCESSORIES: 'accessories',
  PRODUCTS: 'products',
};

export type CategoriesKeys = keyof typeof CATEGORIES;

export const SORT_BY = {
  newest: 'Newest',
  name: 'Name: A to Z',
  nameDesc: 'Name: Z to A',
  price: 'Price: Low to High',
  priceDesc: 'Price: High to Low',
};

export type SortByKeys = keyof typeof SORT_BY;

export const PER_PAGE = {
  16: '16',
  24: '24',
  32: '32',
  40: '40',
  48: '48',
};

export const COLORS = {
  gold: '#FCDBC1',
  red: '#EB5757',
  blue: '#4D5466',
  green: '#C0E9D7',
  silver: '#E1DFDE',
  'space gray': '#343230',
  spacegray: '#343230',
  yellow: '#FAE575',
  midnight: '#1D242D',
  purple: '#E6DFED',
  sierrablue: '#9EBAD3',
  graphite: '#6D6966',
  spaceblack: '#4C4A49',
  starlight: '#E9E3DC',
  pink: '#E8D4D0',
  white: '#FAF8F6',
  black: '#1F1E25',
  rosegold: '#FCD6CF',
  midnightgreen: '#535E56',
};
