import { ProductSortTypes } from '../../utils/catalog';

export const PRODUCT_LIST_MENU: {
  sortBy: ProductSortTypes[];
  itemsOnPage: string[];
} = {
  sortBy: [
    ProductSortTypes.Age,
    ProductSortTypes.Title,
    ProductSortTypes.Price,
  ],
  itemsOnPage: ['4', '8', '16', 'all'],
};

export const DEFAULT_SORT: ProductSortTypes = ProductSortTypes.Age;
export const DEFAULT_ITEMS_ON_PAGE = '4';
