import { Product } from '../types/Product';
import { SortType } from '../types/sortType';

export const sortingProducts = (
  products: Product[],
  sortBy: string | null,
) => {
  if (sortBy) {
    const copyProducts = [...products];

    copyProducts.sort((a, b) => {
      switch (sortBy) {
        case SortType.Alphabetically:
          return a[sortBy].localeCompare(b[sortBy]);

        case SortType.Newest:
          return +b[sortBy] - +a[sortBy];

        case SortType.Cheapest:
          return +a[sortBy] - +b[sortBy];

        default:
          return 0;
      }
    });

    return copyProducts;
  }

  return products;
};
