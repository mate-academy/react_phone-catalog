import { Product } from '../types/Product';

export function getNewProducts(products: Product[]) {
  return products.filter(product => product.year >= 2022);
}
