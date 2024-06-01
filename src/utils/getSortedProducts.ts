import { Product, SortType } from '../types/types';

export const getSortedProducts = (products: Product[], param: SortType) => {
  switch (param) {
    case SortType.Newest:
      return [...products].sort((a, b) => b.year - a.year);
    case SortType.Alphabetically:
      return [...products].sort((a, b) => a.name.localeCompare(b.name));
    case SortType.Cheapest:
      return [...products].sort((a, b) => a.price - b.price);
    case SortType.Default:
      return products;
  }
};
