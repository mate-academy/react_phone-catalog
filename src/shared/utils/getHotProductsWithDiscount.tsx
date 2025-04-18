import { AllProducts } from '../types/AllProducts/AllProducts';

export const getHotProductsWithDiscount = (
  products: AllProducts[],
): (AllProducts & { hotPrice: number })[] => {
  return products
    .filter(product => product.fullPrice - product.price > 100)
    .map(product => ({
      ...product,
      hotPrice: product.fullPrice - product.price,
    }));
};
