import { Products } from '../types/Products';
import { SortOptions } from '../types/SortOptions';

export const sortProducts = (
  products: Products[],
  sortBy: SortOptions | unknown,
) => {
  const sortedArr = [...products];

  switch (sortBy) {
    default:
    case 'newest':
      return sortedArr.sort((p1, p2) => p2.year - p1.year);
    case 'alphabetically':
      return sortedArr.sort((p1, p2) => p1.name.localeCompare(p2.name));
    case 'cheapest':
      return sortedArr.sort((p1, p2) => p1.price - p2.price);
  }
};
