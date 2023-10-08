import { Product } from '../types/Product';
import { SortTypes } from '../types/SortTypes';

export const getSortedProducts = (
  products: Product[],
  sortBy: string | null,
) => {
  const sortedProduct = [...products];

  if (sortBy) {
    sortedProduct.sort((a, b) => {
      switch (sortBy) {
        case SortTypes.Alphabetically:
          return a.name.localeCompare(b.name);
        case SortTypes.Cheapest:
          return a.price - b.price;
        case SortTypes.Newest:
          return a.year - b.year;
        default:
          throw new Error('Sort type error');
      }
    });
  }

  return sortedProduct;
};
