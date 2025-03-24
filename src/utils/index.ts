import { Product } from '../types/Product';

export const sortProductsByPrice = (products: Product[]) => {
  return products
    .sort((a, b) => {
      const discountA = a.fullPrice - a.price;
      const discountB = b.fullPrice - b.price;

      return discountB - discountA;
    })
    .slice(0, 10);
};

export const sortProductsByYear = (products: Product[]) => {
  return products.sort((a, b) => b.year - a.year).slice(0, 10);
};
