import { Product } from '../../types/product';
import { SortBy } from '../../types/SortBy';

export function sortPhones(phones: Product[], sortBy: SortBy) {
  switch (sortBy) {
    case SortBy.Newest:
      return [...phones].sort((a, b) => b.year - a.year);

    case SortBy.Alphabetically:
      return [...phones].sort((a, b) => a.name.localeCompare(b.name));

    case SortBy.Cheapest:
      return [...phones].sort((a, b) => a.price - b.price);

    default:
      return phones;
  }
}
