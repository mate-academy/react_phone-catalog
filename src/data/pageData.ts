import { PageData } from '../types/PageData';

const home: PageData = {
  isNav: true,
  isSearch: false,
  link: '/',
  name: 'Home page',
  navName: 'Home',
};

const phones: PageData = {
  isNav: true,
  isSearch: true,
  apiUrl: 'products',
  link: 'phones',
  color: '#fcdbc1',
  name: 'Mobile phones',
  navName: 'Phones',
  imageUrl: '/categories/phones.png',
};

const tablets: PageData = {
  isNav: true,
  isSearch: true,
  link: 'tablets',
  color: '#8d8d92',
  name: 'Tablets',
  navName: 'Tablets',
  imageUrl: '/categories/tablets_new.png',
};

const accessories: PageData = {
  isNav: true,
  isSearch: true,
  link: 'accessories',
  color: '#973d5f',
  name: 'Accessories',
  navName: 'Accessories',
  imageUrl: '/categories/access_new.png',
};

const cart: PageData = {
  isNav: false,
  isSearch: false,
  link: 'cart',
  name: 'Cart',
  navName: 'Cart',
};

const favourites: PageData = {
  isNav: false,
  isSearch: true,
  link: 'favourites',
  name: 'Favourites',
  navName: 'Favourites',
};

export const pageData: PageData[] = [
  home,
  phones,
  tablets,
  accessories,
  cart,
  favourites,
];
