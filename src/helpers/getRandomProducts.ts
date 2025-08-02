import { Product } from '../types/Product';

export function getRandomProducts(products: Product[], n: number): Product[] {
  const shuffled = [...products].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}
