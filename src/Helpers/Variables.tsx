import { Colors } from '../Types/Colors';

export const preparetedColors: Colors = {
  silver: '#e9ebea',
  gold: '#eee1c6',
  midnightgreen: '#47534d',
  spacegray: '#696863',
  red: '#e03547',
  purple: '#e1d9ee',
  white: '#eae5df',
  yellow: '#fbe580',
  black: '#2b2b2b',
  green: '#b4e9cf',
};

export const contacts = [
  {
    id: 1,
    url: 'https://www.instagram.com/partnersinbahamas/',
    img: 'Images/instagram.png',
  },

  {
    id: 2,
    url: 'https://github.com/partnersinbahamas',
    img: 'Images/gh.svg',
  },

  {
    id: 2,
    url: 'mailto:denisbokov1703@gmail.com',
    img: 'Images/email.png',
  },
];

export const sliderImages = [
  { id: 0, url: 'banner-phones.png' },
  { id: 1, url: 'banner-accessories.png' },
  { id: 2, url: 'banner-tablets.png' },
  { id: 3, url: 'category-accessories.png' },
  { id: 4, url: 'category-phones.png' },
  { id: 5, url: 'category-tablets.png' },
];

export const categories = [
  {
    name: 'Mobile Phones',
    imgUrl: 'new/img/category-phones.png',
    bgcColor: '#FCDBC1',
    linkTo: '/phones',
  },
  {
    name: 'Tablets',
    imgUrl: 'new/img/category-tablets.png',
    bgcColor: '#ddd',
    linkTo: '/tablets',
  },
  {
    name: 'Accessories',
    imgUrl: 'Images/airpods-max-select-green-202011.png',
    bgcColor: '#DFEED8',
    linkTo: '/accessories',
  },
];
