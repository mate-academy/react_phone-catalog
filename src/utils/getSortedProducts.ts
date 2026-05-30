import { Product } from '../types/Product';

export function getSortedProducts(products: Product[], sortField: string) {
  switch (sortField) {
    case 'year':
      return [...products].sort((a, b) => b.year - a.year);

    case 'price':
      return [...products].sort((a, b) => a.price - b.price);

    case 'name':
      return [...products].sort((a, b) => a.name.localeCompare(b.name));

    default:
      return [...products];
  }
}