import { UpgradedProduct } from '../types/UpgradedProducts';

export const getBrandNewProducts = (products: UpgradedProduct[]) => {
  return [...products].sort(
    (product1, product2) => product2.fullPrice - product1.fullPrice,
  );
};
