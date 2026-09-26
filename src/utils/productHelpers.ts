import { Product } from '../types/Product';

export const sortByNewest = (products: Product[]) => {
  return [...products].sort((a, b) => b.year - a.year);
};

export const sortByDiscount = (products: Product[]) => {
  return [...products].sort(
    (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
  );
};
