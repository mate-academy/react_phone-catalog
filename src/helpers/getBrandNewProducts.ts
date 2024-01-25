import { UpgratedProduct } from '../types/UpgratedProduct';

export const getBrandNewProducts = (products: UpgratedProduct[]) => {
  return [...products].sort(
    (product1, product2) => product2.fullPrice - product1.fullPrice,
  );
};
