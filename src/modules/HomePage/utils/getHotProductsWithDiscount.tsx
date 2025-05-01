import { AllProducts } from '../../../shared/types/AllProducts/AllProducts';

export const getHotProductsWithDiscount = (
  products: AllProducts[],
): AllProducts[] => {
  return products.filter(product => product.fullPrice - product.price > 100);
};
