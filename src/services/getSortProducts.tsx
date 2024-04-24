import { Product } from '../types/Product';

export function getSortProducts(sortParams: string) {
  switch (sortParams) {
    case 'Alphabetically':
      return (a: Product, b: Product) =>
        a.name.localeCompare(b.name, 'en', { numeric: true });

    case 'Cheapest':
      return (a: Product, b: Product) => a.price - b.price;

    default:
      return (a: Product, b: Product) => b.year - a.year;
  }
}
