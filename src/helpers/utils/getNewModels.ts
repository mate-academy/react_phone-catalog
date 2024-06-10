import { Product } from '../types/Product';

export function getNewModels(products: Product[]) {
  const newModels = products
    .filter(product => !product.discount)
    .sort((product1, product2) => product2.price - product1.price);

  return newModels;
}
