import { Product } from '../types/Product';

export const getDiscountAmount = (product: Product) => {
  return product.fullPrice - product.price;
};

export const hasDiscount = (product: Product) => {
  return product.fullPrice > product.price;
};
