import { Product } from '../types/Product';

export function getSortedProducts(sortParams: string) {
  switch (sortParams) {
    case 'title':
      return (a: Product, b: Product) =>
        a.name.localeCompare(b.name, 'en', { numeric: true });

    case 'price':
      return (a: Product, b: Product) => a.price - b.price;

    default:
      return (a: Product, b: Product) => b.year - a.year;
  }
}
