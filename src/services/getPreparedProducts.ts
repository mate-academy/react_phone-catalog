import { ProductInfo } from '../types/ProductInfo';
import { SortBy } from '../types/SortBy';

export const getPreparedProducts = (
  sortedProducts: ProductInfo[],
  {
    sortType,
    pages,
    pageFrom,
    pageTo,
  }: {
    sortType: SortBy | null;
    pages: string | number;
    pageFrom: number;
    pageTo: number;
  },
) => {
  const preparedProducts = [...sortedProducts];

  if (sortType) {
    preparedProducts.sort((p1, p2) => {
      switch (sortType) {
        case SortBy.alphabetically:
          return p1.name.localeCompare(p2.name);

        case SortBy.newest:
          return p2.year - p1.year;

        case SortBy.cheapest:
          return p1.price - p2.price;

        default:
          return 0;
      }
    });
  }

  const isNumber = isNaN(+pages);

  if (pages && !isNumber) {
    return preparedProducts.slice(pageFrom, pageTo);
  }

  return preparedProducts;
};
