import { Product } from '../types/Product';

export function getHotPricedProducts(
  products: Product[],
  n: number,
): Product[] {
  return [...products]
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, n);
}
