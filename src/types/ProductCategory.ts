import {
  PRODUCTS_CATEGORIES,
  PRODUCTS_PAGES_TITLES,
} from '../constants/Products/productsCategory';

export type Category =
  (typeof PRODUCTS_CATEGORIES)[keyof typeof PRODUCTS_CATEGORIES];

export type CategoryTitle =
  (typeof PRODUCTS_PAGES_TITLES)[keyof typeof PRODUCTS_PAGES_TITLES];
