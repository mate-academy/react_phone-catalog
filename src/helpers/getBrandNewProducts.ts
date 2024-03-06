import { ProductExtended } from '../types/ProductExtended';

export const getBrandNewProducts = (products: ProductExtended[]) => {
  return [...products].sort(
    (item1, item2) => item2.fullPrice - item1.fullPrice,
  );
};
