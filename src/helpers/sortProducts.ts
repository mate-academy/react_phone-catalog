import { ProductInfo } from '../types/ProductInfo';
import { SortType } from '../types/SortType';

export const sortProducts = (sort: string, products: ProductInfo[]) => {
  switch (sort) {
    case SortType.alphabetically:
      return [...products].sort((a, b) => a.name.localeCompare(b.name));

    case SortType.cheapest:
      return [...products].sort((a, b) => a.priceDiscount - b.priceRegular);

    default:
      return [...products].sort((a, b) => b.priceRegular - a.priceRegular);
  }
};
