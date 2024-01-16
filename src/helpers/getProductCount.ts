import { Product } from '../types/Product';

export const getProductCount = (
  products: Product[],
  productType: string,
) => {
  return products.reduce((acc, curr) => {
    if (curr.category !== productType) {
      return acc;
    }

    return acc + 1;
  }, 0);
};
