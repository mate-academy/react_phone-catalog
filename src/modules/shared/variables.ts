import { Lang } from './Enum/Lang';

export const langs = Object.values(Lang);
export const mobileWidth = window.innerWidth < 640;
export const desktopWidth = window.innerWidth >= 1200;

export const categoryList = ['phones', 'tablets', 'accessories'];

export const productsColorsHex = {
  black: '#000000',
  white: '#FFFFFF',
  green: '#28A745',
  yellow: '#FFD700',
  purple: '#800080',
  red: '#FF3B30',
  spacegray: '#4A4A4A',
  midnightgreen: '#004953',
  gold: '#FFD700',
  silver: '#C0C0C0',
  rosegold: '#B76E79',
  coral: '#FF7F50',
  midnight: '#191970',
  spaceblack: '#0B0B0B',
  blue: '#007AFF',
  pink: '#FFC0CB',
  graphite: '#383838',
  sierrablue: '#A6C8FF',
};
