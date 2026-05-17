import { Product } from '../types/Product';

export function getHotPricedProducts(
  products: Product[],
  n: number,
): Product[] {
  return [...products]
    .sort((a, b) => {
      const discountA = a.fullPrice - a.price;
      const discountB = b.fullPrice - b.price;

      return discountB - discountA;
    })
    .slice(0, n);
}
