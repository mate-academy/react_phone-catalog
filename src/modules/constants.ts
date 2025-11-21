import { ProductSortTypes } from '../utils/catalog';

export const SLIDER_COUNT = 15;
export const CURRENCY_SYMBOL = `$`;
export const HOME_SLIDER_TIME = 5000;
export const HOME_CATEGORIES_LIST = ['phones', 'tablets', 'accessories'];
export const siteLanguages = {
  uk: 'UA',
  en: 'EN',
};

export const PRODUCT_LIST_MENU: {
  sortBy: ProductSortTypes[];
  itemsOnPage: string[];
} = {
  sortBy: ['newest', 'alphabetically', 'cheapest'],
  itemsOnPage: ['4', '8', '16', 'all'],
};
