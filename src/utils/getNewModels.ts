import { Product } from '../types/Product';

export function getNewModels(products: Product[]): Product[] {
  const latestYear = Math.max(...products.map(product => product.year));

  return products.filter(product => product.year === latestYear);
}
