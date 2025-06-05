import { SortOptions } from '../../shared/constants/sortOptions';
import { Product } from '../../shared/types/Product';

export function getProductsBySort(items: Product[], sort: string) {
  const sortedItems = [...items];

  switch (sort) {
    case SortOptions.NEWEST:
      return sortedItems.sort((a, b) => b.year - a.year);
    case SortOptions.ALPHABETICALLY:
      return sortedItems.sort((a, b) => a.name.localeCompare(b.name));
    case SortOptions.CHEAPEST:
      return sortedItems.sort((a, b) => a.price - b.price);
    default:
      return sortedItems;
  }
}
