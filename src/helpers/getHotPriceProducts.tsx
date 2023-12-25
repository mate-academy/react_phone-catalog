import { UpgradedProduct } from '../types/UpgradedProduct';

export const getHotPriceProducts = (products: UpgradedProduct[]) => {
  return [...products].sort(
    (product1, product2) => (product2.fullPrice - product2.price)
    - (product1.fullPrice - product1.price),
  );
};
