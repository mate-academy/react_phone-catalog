import { AllProducts } from '../../../shared/types/AllProduct/AllProduct';

export const getHotPriceProduct = (products: AllProducts[]) => {
  if (products.length === 0) {
    return [];
  }

  return products.filter(product => product.fullPrice - product.price > 100);
};
