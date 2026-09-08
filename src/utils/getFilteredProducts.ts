import { Product } from '../types/Product';

export function getFilteredProducts(products: Product[], sortField: string) {
  switch (sortField) {
    case 'year':
      return [...products].sort((p1, p2) => p2.year - p1.year);

    case 'price':
      return [...products].sort((p1, p2) => p1.price - p2.price);

    case 'name':
      return [...products].sort((p1, p2) => p1.name.localeCompare(p2.name));

    default:
      return [...products];
  }
}
