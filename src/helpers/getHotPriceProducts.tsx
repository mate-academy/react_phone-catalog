import { UpgratedProduct } from '../types/UpgratedProduct';

export const getHotPriceProducts = (products: UpgratedProduct[]) => {
  return [...products].sort(
    (product1, product2) => (product2.fullPrice - product2.price)
      - (product1.fullPrice - product1.price),
  );
};
