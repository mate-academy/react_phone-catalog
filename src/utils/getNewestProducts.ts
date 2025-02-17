import { Product } from '../types/Product';

export function getNewestProducts(products: Product[]): Product[] {
  const maxYear = Math.max(...products.map(product => product.year));

  return products.filter(product => product.year === maxYear);
}
