import { Product } from '../types/Product';

export function getNewModels(products: Product[]) {
  const newModels = products
    .sort((product1, product2) => product2.year - product1.year)
    .slice(0, 10);

  return newModels;
}
