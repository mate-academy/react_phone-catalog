import { BaseProduct } from '../types';

export function SortProducts(products: BaseProduct[], sortBy: string) {
  return [...products].sort((a, b) => {
    if (sortBy === 'newest') {
      return b.year - a.year;
    }

    if (sortBy === 'alphabetically') {
      return a.name.localeCompare(b.name);
    }

    if (sortBy === 'discount') {
      return b.fullPrice - b.price - (a.fullPrice - a.price);
    }

    if (sortBy === 'cheapest') {
      return a.price - b.price;
    }

    return b.year - a.year;
  });
}
