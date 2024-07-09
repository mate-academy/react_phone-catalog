import { SortBy } from '../enums/SortBy';
import { Product } from '../types/ContextType/Product';

export const sortedBy = (
  sortByItem: string,
  device: Product[],
): Product[] => {
  const copyOfProducts = [...device];

  if (sortByItem) {
    switch (sortByItem) {
      case SortBy.newest:
        return copyOfProducts.sort((a, b) => b.year - a.year);
      case SortBy.alphabetically:
        return copyOfProducts.sort((a, b) => a.name.localeCompare(b.name));
      case SortBy.cheapest:
        return copyOfProducts.sort((a, b) => a.price - b.price);
      default:
        return copyOfProducts;
    }
  }

  return copyOfProducts;
};
