import { Filter } from '../types/Filter';
import { Product } from '../types/Product';
import { Sort } from '../types/Sort';
import { sortProducts } from './sortProducts';

export const filterProducts = (
  products: Product[],
  filterName: Filter,
) => {
  switch (filterName) {
    case Filter.BRAND:
      return sortProducts(products, Sort.PRICE)
        .reverse()
        .slice(0, 8);
    case Filter.HOT:
      return sortProducts(products, Sort.PRICE).slice(0, 8);
    default:
      return products;
  }
};
