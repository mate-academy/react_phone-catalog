import { Products } from '../types/Products';

export function getNewModels(products: Products[]): Products[] {
  const latestYear = Math.max(...products.map(product => product.year));

  return products.filter(product => product.year === latestYear);
}
