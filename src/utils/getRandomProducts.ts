import { Product } from '../types/Product';

export function getRandomProducts(products: Product[]): Product[] {
  return [...products].sort(() => Math.random() - 0.5).slice(0, 10);
}