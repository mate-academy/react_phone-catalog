import { Product } from '../types/Product';

export function sortById(products: Product[]): Product[] {
  return [...products].sort((product1, product2) => product2.id - product1.id);
}
