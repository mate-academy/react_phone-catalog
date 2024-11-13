import { Product } from '../types/Ptoduct';

export const getHotPricesProducts = (products: Product[]) => {
  return [...products].sort((a, b) => {
    const discountA = a.fullPrice - a.price;
    const discountB = b.fullPrice - b.price;

    return discountB - discountA;
  });
};
