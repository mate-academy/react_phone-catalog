import { Product } from '../types/Product';
import { SortBy } from '../types/SortBy';

export function sortBy<T extends { id: string }>(
  products: Product[],
  array: T[],
  sortBy: SortBy,
): T[] {
  let copyArray: T[] = [];
  let copyProducts: Product[] = [...products];

  switch (sortBy) {
    case 'newest':
      copyProducts.sort((a, b) => b.year - a.year);
      break;

    case 'alphabetical':
      copyProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case 'cheapest':
      copyProducts.sort((a, b) => a.price - b.price);
      break;
  }

  copyProducts.forEach(product => {
    const match = array.find(item => item.id === product.itemId);

    if (match) {
      copyArray.push(match);
    }
  });

  return copyArray;
}
