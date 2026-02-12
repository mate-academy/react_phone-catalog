import { AllProducts } from '../../../shared/types/AllProducts/AllProducts';

export const getHotProductsWithDiscount = (
  products: AllProducts[],
): AllProducts[] => {
  if (products.length === 0) {
    return [];
  }

  return products.filter(product => product.fullPrice - product.price > 100);
};
