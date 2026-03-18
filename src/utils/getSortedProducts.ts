import { SORT_BY } from '../constants/Products/sortingBy';
import { Product } from '../types/Product';

export const getSortedProducts = (products: Product[], sortBy: string) => {
  return [...products].sort((a, b) => {
    if (sortBy === SORT_BY.age) {
      return b.year - a.year;
    }

    if (sortBy === SORT_BY.price) {
      return a.price - b.price;
    }

    return a.name.localeCompare(b.name);
  });
};
