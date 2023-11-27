import { Product } from '../types/Product';
import { SortType } from '../types/SortType';

export const getSortedProducts = (
  products: Product[],
  sortBy: string | null,
) => {
  let sortedProducts = [...products];

  if (sortBy) {
    sortedProducts = sortedProducts.sort((productA, productB) => {
      switch (sortBy) {
        case SortType.New:
          return productB.year - productA.year;

        case SortType.Alphabetically:
          return productA.name.localeCompare(productB.name);

        case SortType.Price:
          return productA.price - productB.price;

        default:
          throw new Error('The sort type is not defined');
      }
    });
  }

  return sortedProducts;
};
