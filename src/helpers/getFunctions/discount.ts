import { ProductType } from '../types/ProductType';

export const getDiscountAmount = (product: ProductType) => {
  return product.fullPrice - product.price;
};

export const hasDiscount = (product: ProductType) => {
  return product.fullPrice > product.price;
};
