import { Product } from '../types/types';

export const getHotPricesProducts = (products: Product[]) => {
  return products.filter(
    ({ price, fullPrice }) => ((fullPrice - price) / fullPrice) * 100 >= 12,
  );
};
