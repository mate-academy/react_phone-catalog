import { Product } from '../types/Product';

export function getFiltredProducts(
  products: Product[],
  callback: (product: Product) => boolean,
): Product[] {
  const filtredProducts = products.filter(callback);

  return filtredProducts;
}
