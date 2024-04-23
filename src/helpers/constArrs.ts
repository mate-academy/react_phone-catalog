import { SortType } from '../types/SortType';

export const menuItems = [
  { url: '/', text: 'home' },
  { url: 'phones', text: 'phones' },
  { url: 'tablets', text: 'tablets' },
  { url: 'accessories', text: 'accessories' },
];

export const allowedPaths = ['/phones', '/tablets', '/accessories'];

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
  { name: 'Mobile phones', link: 'phones', image: 'img/category-phones.png' },
  { name: 'Tablets', link: 'tablets', image: 'img/category-tablets.png' },
  {
    name: 'Accessories',
    link: 'accessories',
    image: 'img/category-accessories.png',
  },
];

export const colors = [
  { name: 'white', value: '#fafafa' },
  { name: 'black', value: '#0f0f11' },
  { name: 'silver', value: '#e8e8e8' },
  { name: 'red', value: '#e61736' },
  { name: 'green', value: '#85ccae' },
  { name: 'yellow', value: '#fae864' },
  { name: 'purple', value: '#c7b5f5' },
  { name: 'gold', value: '#edccad' },
  { name: 'rose gold', value: '#fcd7d2' },
  { name: 'rosegold', value: '#fcd7d2' },
  { name: 'spacegray', value: '#636160' },
  { name: 'space gray', value: '#636160' },
  { name: 'graphite', value: '#636160' },
  { name: 'midnightgreen', value: '#607064' },
  { name: 'coral', value: '#fa7878' },
  { name: 'sky blue', value: '#cce6ff' },
  { name: 'sierrablue', value: '#cce6ff' },
];
