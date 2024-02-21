import { Product } from '../types/Product';

export function getHotPriceProducts(products: Product[]): Product[] {
  return products.filter(product => product.fullPrice - product.price >= 85);
}
