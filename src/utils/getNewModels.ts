import { ProductGeneral } from '../types/ProductGeneral';

export const getNewModels = (
  products: ProductGeneral[],
  itemsOnPage: string | number,
) => {
  const seenColors = new Set<string>();

  const prepareProducts = products
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

  if (itemsOnPage === 'all') {
    return prepareProducts;
  }

  return prepareProducts.slice(0, +itemsOnPage);
};
