import { Product } from '../../../types/Product';

export function sortProductsById(products: Product[]): Product[] {
  return [...products].sort((p1, p2) => p2.id - p1.id);
}
