import { ProductExtended } from '../types/ProductExtended';

export const getHotPriceProducts = (products: ProductExtended[]) => {
  return [...products].sort(
    (item1, item2) =>
      item1.fullPrice - item2.price - (item1.fullPrice - item2.price),
  );
};
