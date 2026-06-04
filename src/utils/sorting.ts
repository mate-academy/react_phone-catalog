import { ProductType } from '../types/product.types';
import { SortType } from '../types/sorting.types';

export const sortProducts = (
  products: ProductType[],
  sortType: SortType,
): ProductType[] => {
  const sorted = [...products];

  switch (sortType) {
    case SortType.Alphabetically:
      return sorted.sort((a, b) => a.name.localeCompare(b.name));

    case SortType.Cheapest:
      return sorted.sort((a, b) => a.priceDiscount - b.priceDiscount);

    case SortType.HotPrices:
      return sorted.sort((a, b) => {
        const discountA = a.priceRegular - a.priceDiscount;
        const discountB = b.priceRegular - b.priceDiscount;

        return discountB - discountA;
      });
  }

  return sorted;
};
