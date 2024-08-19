import { Product } from '../types/Product';

export const getSortedList = (
  sortingArray: Product[],
  sortParams: string | null,
) => {
  switch (sortParams) {
    case 'Alphabetically':
      return [...sortingArray].sort((a, b) => a.name.localeCompare(b.name));

    case 'Cheapest':
      return [...sortingArray].sort((a, b) => a.price - b.price);

    default:
      return [...sortingArray].sort((a, b) => b.year - a.year);
  }
};
