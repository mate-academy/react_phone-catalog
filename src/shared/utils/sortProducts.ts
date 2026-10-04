import { Product } from '../types/Product';

export function sortProducts(products: Product[], sort: string) {
  const sorted = [...products];

  switch (sort) {
    case 'newest':
      return sorted.sort((a, b) => b.year - a.year);

    case 'alphabetically':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));

    case 'cheapest':
      return sorted.sort((a, b) => a.price - b.price);

    default:
      return sorted;
  }
}
