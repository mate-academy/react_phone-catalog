import { ROUTES } from '../../router/routes';

export const PRODUCTS_CATEGORIES = {
  phones: 'phones',
  tablets: 'tablets',
  accessories: 'accessories',
} as const;

export const PRODUCTS_PAGES_TITLES = {
  phones: 'categories.phones',
  tablets: 'categories.tablets',
  accessories: 'categories.accessories',
} as const;

export const CATEGORY_LIST = [
  {
    key: PRODUCTS_CATEGORIES.phones,
    image: '/img/category-phones.png',
    to: ROUTES.phones,
  },
  {
    key: PRODUCTS_CATEGORIES.tablets,
    image: '/img/category-tablets.png',
    to: ROUTES.tablets,
  },
  {
    key: PRODUCTS_CATEGORIES.accessories,
    image: '/img/category-accessories.png',
    to: ROUTES.accessories,
  },
];
