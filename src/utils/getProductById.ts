import { Product } from '../types/Product';

export function getProductById(products: Product[], itemId: string) {
  return products.find(product => product.itemId === itemId);
}
