import { ProductSortTypes } from '../../utils/catalog';

export const PRODUCT_LIST_MENU: {
  sortBy: ProductSortTypes[];
  itemsOnPage: string[];
} = {
  //  sortBy: ['newest', 'alphabetically', 'cheapest'],
  sortBy: ['age', 'title', 'price'],
  itemsOnPage: ['4', '8', '16', 'all'],
};
