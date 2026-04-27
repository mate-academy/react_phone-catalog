import { Product } from '../types/Product';

export function getNewestExpensiveProducts(
  products: Product[],
  n: number,
): Product[] {
  const maxYear = Math.max(...products.map(p => p.year));

  return products
    .filter(p => p.year === maxYear)
    .sort((a, b) => b.price - a.price)
    .slice(0, n);
}
