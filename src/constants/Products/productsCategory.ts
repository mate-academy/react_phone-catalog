import { ROUTES } from '../../router/routes';
import { getAssetPath } from '../../utils/getAssetPath';

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
    image: getAssetPath('img/category-phones.png'),
    to: ROUTES.phones,
  },
  {
    key: PRODUCTS_CATEGORIES.tablets,
    image: getAssetPath('img/category-tablets.png'),
    to: ROUTES.tablets,
  },
  {
    key: PRODUCTS_CATEGORIES.accessories,
    image: getAssetPath('img/category-accessories.png'),
    to: ROUTES.accessories,
  },
];
