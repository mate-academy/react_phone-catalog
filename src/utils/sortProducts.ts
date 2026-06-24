import { Product } from '../types/Product';

export type SortType = 'newest' | 'alphabetically' | 'cheapest';

export function sortProducts(products: Product[], sort: SortType) {
  return [...products].sort((p1, p2) => {
    switch (sort) {
      case 'newest':
        return p2.year - p1.year;

      case 'alphabetically':
        return p1.name.localeCompare(p2.name);

      case 'cheapest':
        return p1.price - p2.price;
    }
  });
}
