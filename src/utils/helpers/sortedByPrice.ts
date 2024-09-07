import { TProduct } from 'utils/types/product.type';

export const getMostExpensiveProduct = (products: TProduct[]) =>
  [...products].sort((a, b) => b.price - a.price);

export const getProductWithLargestDiscount = (products: TProduct[]) =>
  [...products].sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));
