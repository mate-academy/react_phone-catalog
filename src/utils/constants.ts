import { Category } from '../types/Category';

export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? '/'
    : 'https://yaros-dev.github.io/react_phone-catalog/';

export const PRODUCTS_URL = 'api/products.json';

export const getCategoryUrl = (category: Category) => {
  return `api/${category}.json`;
};
