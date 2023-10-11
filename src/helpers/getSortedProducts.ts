import { Product } from '../types/Product';
import { SortTypes } from '../types/SortTypes';

export const getSortedProducts = (
  products: Product[],
  sortBy: string | null,
) => {
  const sotredProducts = [...products];

  if (sortBy) {
    sotredProducts.sort((firstProduct, secondProduct) => {
      switch (sortBy) {
        case SortTypes.Newest:
          return secondProduct.year - firstProduct.year;

        case SortTypes.Alphabetically:
          return firstProduct.name.localeCompare(secondProduct.name);

        case SortTypes.Cheapest:
          return firstProduct.price - secondProduct.price;

        default:
          throw new Error('Sort type error');
      }
    });
  }

  return sotredProducts;
};
