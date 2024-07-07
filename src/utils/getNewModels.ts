import { ProductGeneral } from '../types/ProductGeneral';

export const getNewModels = (products: ProductGeneral[]) => {
  const seenColors = new Set<string>();

  return products
    .filter(product => product.year >= 2022 && product.color)
    .filter(product => {
      if (seenColors.has(product.category)) {
        return false;
      } else {
        seenColors.add(product.color);

        return true;
      }
    })
    .sort((product1, product2) => product2.fullPrice - product1.fullPrice);
};
