import { BANNER_IMGS } from '../img/slider';
import { ColletionColors } from '../type/ColletionColors';
import { StateStyles } from '../type/StateStyleSlider';

export const BASE_URL
  = 'https://mate-academy.github.io/react_phone-catalog/_new/';

export const HOT_PRICE_SLIDER: StateStyles = {
  itemWidth: 272,
  frameSize: 4,
  step: 1,
  animationDuration: 1000,
  infinity: true,
  gap: 16,
};

export const SORT_BY = [
  {
    id: 'age',
    title: 'Newest',
  },
  {
    id: 'name',
    title: 'Alphabetically',
  },
  {
    id: 'price',
    title: 'Cheapest',
  },
];

export const ITEMS_ON_PAGE = [
  {
    id: '4',
    title: '4',
  },
  {
    id: '8',
    title: '8',
  },
  {
    id: '16',
    title: '16',
  },
  {
    id: 'all',
    title: 'All',
  },
];

export const colorsHex: ColletionColors = {
  black: '#1F2020',
  coral: '#EE7762',
  gold: '#F9E5C9',
  green: '#AEE1CD',
  midnightgreen: '#004953',
  purple: '#e5ddea',
  red: '#BA0C2E',
  rosegold: '#E6C7C2',
  silver: '#e2e4e1',
  spacegray: '#535150',
  white: '#F8F7F2',
  yellow: '#F3D060',
};

export const SLIDER_LIST = [
  { id: 1, src: BANNER_IMGS.bannerTablet, alt: 'Tablets' },
  { id: 2, src: BANNER_IMGS.bannerPhones, alt: 'Phones' },
  { id: 3, src: BANNER_IMGS.bannerAccessories, alt: 'Accessories' },
];
