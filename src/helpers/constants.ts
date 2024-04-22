import { PerPageValues } from '../types/PerPageValues';

export const BASE_URL = (
  'https://mate-academy.github.io/react_phone-catalog/_new'
);
export const BANNER_IMAGE_ROOT = `${BASE_URL}/img`;
export const productCardWidth = 272;
export const productsGap = 16;
export const DEFAULT_PER_PAGE = PerPageValues.SIXTEEN;
export const PRODUCT_PAGES = [
  '/phones', '/tablets', '/accessories', '/favourites'];
export const ALL_PAGES = ['/', '/home', '/cart', ...PRODUCT_PAGES];
