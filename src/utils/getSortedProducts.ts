import { Products } from '../types/Products';

export function getSortedProducts(products: Products[], sortField: string) {
  switch (sortField) {
    case 'year':
      return [...products].sort((a, b) => a.year - b.year);

    case 'price':
      return [...products].sort((a, b) => a.price - b.price);

    case 'name':
      return [...products].sort((a, b) => a.name.localeCompare(b.name));

    default:
      return [...products];
  }
}
