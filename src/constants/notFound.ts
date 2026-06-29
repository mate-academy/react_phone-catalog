import { getAssetPath } from '../utils/getAssetPath';

export const IMG_NOT_FOUND = {
  page: getAssetPath('img/page-not-found.png'),
  product: getAssetPath('img/product-not-found.png'),
} as const;

export const TITLE_NOT_FOUND = {
  page: 'not-found.page',
  product: 'not-found.product',
  cart: 'not-found.cart',
  favorite: 'not-found.favorite',
  query: 'not-found.query',
} as const;

export type NotFoundImage = (typeof IMG_NOT_FOUND)[keyof typeof IMG_NOT_FOUND];
