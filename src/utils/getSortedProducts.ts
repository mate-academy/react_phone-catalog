import { Product } from '../types/Product';

export function getSortedProducts(
  products: Product[],
  callback: (a: Product, b: Product) => number,
  needCount?: number,
): Product[] {
  const sortedProducts = products.sort(callback);

  return needCount ? [...sortedProducts].splice(0, needCount) : sortedProducts;
}
