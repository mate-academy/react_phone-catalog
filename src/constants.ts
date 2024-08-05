import bannerIPhone14Pro from './images/banner/banner-iPhone-14-pro.webp';
import bannerAccessories from './images/banner/banner-accessories-2.webp';
import bannerTablets from './images/banner/banner-tablets-2.webp';
// eslint-disable-next-line max-len
import bannerIPhone14ProMobile from './images/banner/banner-iPhone-14-pro--mobile.webp';
// eslint-disable-next-line max-len
import bannerAccessoriesMobile from './images/banner/banner-accessories-2--mobile.webp';
import bannerTabletsMobile from './images/banner/banner-tablets-2--mobile.webp';

import { SortBy } from './types/SortBy';
import { PerPage } from './types/PerPage';
import { Image } from './types/Image';

export const BANNER_IMAGES: Image[] = [
  {
    url: bannerIPhone14Pro,
    alt: 'apple iphone 14 pro banner',
    link: '../phones/apple-iphone-14-pro-128gb-spaceblack',
  },
  { url: bannerAccessories, alt: 'accessories banner', link: '/accessories' },
  { url: bannerTablets, alt: 'tablets banner', link: '/tablets' },
];

export const BANNER_IMAGES_MOBILE: Image[] = [
  {
    url: bannerIPhone14ProMobile,
    alt: 'apple iphone 14 pro banner',
    link: '../phones/apple-iphone-14-pro-128gb-spaceblack',
  },
  {
    url: bannerAccessoriesMobile,
    alt: 'accessories banner',
    link: '/accessories',
  },
  { url: bannerTabletsMobile, alt: 'tablets banner', link: '/tablets' },
];

export const BASE_URL = 'https://YevhenProtasov.github.io/react_phone-catalog/';
// for local use
// export const BASE_URL = '';

export const CARD_GAP = 16;

export const DEFAULT_QUERY = '';
export const DEFAULT_SORT = SortBy.NEWEST;
export const DEFAULT_PER_PAGE = PerPage.ALL;

export const AUTOCOMPLETE_DELAY = 300;

export const DEVICE_COLORS = {
  black: '#201D24',
  blue: '#043458',
  coral: '#FF7F50',
  gold: '#F9E5C9',
  graphite: '#5C5B57',
  green: '#364935',
  midnight: '#171E27',
  midnightgreen: '#004953',
  pink: '#FAE0D8',
  purple: '#660099',
  red: '#A50011',
  rosegold: '#B76E79',
  'rose gold': '#B76E79',
  silver: '#F5F5F0',
  sierrablue: '#9BB5CE',
  'sky blue': '#87CEEB',
  spaceblack: '#505150',
  spacegray: '#535150',
  'space gray': '#535150',
  starlight: '#F9F3EE',
  white: '#F9F6EF',
  yellow: '#F3D060',
};
