import { Product } from '../types/Product';
import { SortBy } from '../types/SortBy';
import { getProductDiscount } from './getProductDiscount';

export const compareProducts = (
  product1: Product,
  product2: Product,
  sortBy: SortBy,
) => {
  switch (sortBy) {
    case SortBy.AGE:
      return product1.age - product2.age;

    case SortBy.PRICE:
      return getProductDiscount(product1) - getProductDiscount(product2);

    case SortBy.NAME:
      return product1.name.localeCompare(product2.name);

    default:
      return 0;
  }
};
