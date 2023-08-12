import { Product } from '../types/Product';

export const getProductsCount = (products: Product[], productType: string) => {
  return products.reduce((acc, curr) => {
    if (curr.type !== productType) {
      return acc;
    }

    return acc + 1;
  }, 0);
};
