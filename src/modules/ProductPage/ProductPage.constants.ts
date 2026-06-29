import { ProductSortTypes } from '../../utils/catalog';

export const PRODUCT_LIST_MENU: {
  sortBy: ProductSortTypes[];
  perPage: string[];
} = {
  sortBy: [
    ProductSortTypes.Age,
    ProductSortTypes.Title,
    ProductSortTypes.Price,
  ],
  perPage: ['4', '8', '16', 'all'],
};

export const DEFAULT_SORT: ProductSortTypes = ProductSortTypes.Age;
export const DEFAULT_ITEMS_ON_PAGE = 'all';
export const PRODUCT_MENU_KEY = 'productMenuKey';
