import { Product } from '../types/Product';

export function getSortedProducts(
  sort: string, products: Product[],
): Product[] {
  switch (sort) {
    case 'age':
      return products.sort((a, b) => b.year - a.year);
    case 'price':
      return products.sort((a, b) => a.price - b.price);
    case 'name':
      return products.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return products;
  }
}
