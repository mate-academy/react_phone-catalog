import { SortType } from '../types/SortType';

export const menuItems = [
  { url: '/', text: 'home' },
  { url: 'phones', text: 'phones' },
  { url: 'tablets', text: 'tablets' },
  { url: 'accessories', text: 'accessories' },
];

export const footerLinks = [
  {
    url: 'https://github.com/oshapkun',
    text: 'Github',
    openInNewTab: true,
  },
  {
    url: 'https://t.me/sestra_creatyva',
    text: 'Contacts',
    openInNewTab: true,
  },
  {
    url: 'https://github.com/oshapkun',
    text: 'Rights',
    openInNewTab: true,
  },
];

export const sortBy = [
  { name: SortType.newest, title: 'Newest' },
  { name: SortType.alphabetically, title: 'Alphabetically' },
  { name: SortType.cheapest, title: 'Cheapest' },
];

export const itemsOnPage = [
  { name: '16', title: '16' },
  { name: '8', title: '8' },
  { name: '4', title: '4' },
  { name: 'all', title: 'All' },
];

export const categories = [
  { name: 'Mobile phones', link: 'phones', image: '/img/category-phones.png' },
  { name: 'Tablets', link: 'tablets', image: '/img/category-tablets.png' },
  {
    name: 'Accessories',
    link: 'accessories',
    image: '/img/category-accessories.png',
  },
];

interface ColorPalette {
  [key: string]: string;
}

export const colors: ColorPalette = {
  white: '#fafafa',
  black: '#0f0f11',
  silver: '#e8e8e8',
  red: '#e61736',
  green: '#85ccae',
  yellow: '#fae864',
  purple: '#c7b5f5',
  gold: '#edccad',
  rosegold: '#fcd7d2',
  spacegray: '#636160',
  midnightgreen: '#607064',
  coral: '#fa7878',
};
