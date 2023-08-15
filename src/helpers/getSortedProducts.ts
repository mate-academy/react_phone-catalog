import { Product } from '../types/Product';
import { SortTypes } from '../types/SortTypes';

export const getSortedProducts = (
  products: Product[],
  sortBy: string | null,
) => {
  const sotredProducts = [...products];

  if (sortBy) {
    sotredProducts.sort((productA, productB) => {
      switch (sortBy) {
        case SortTypes.Newest:
          return productB.year - productA.year;

        case SortTypes.Alphabetically:
          return productA.name.localeCompare(productB.name);

        case SortTypes.Cheapest:
          return productA.price - productB.price;

        default:
          throw new Error('Sort type error');
      }
    });
  }

  return sotredProducts;
};
