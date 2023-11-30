import { getDiscountAmount } from './getDiscount';
import { Product } from '../types/Product';

export const getHotProducts = (products: Product[]) => {
  return products
    .filter(product => product.discount)
    .sort((product1, product2) => {
      return getDiscountAmount(product2) - getDiscountAmount(product1);
    });
};

export const getNewProducts = (products: Product[]) => {
  return products
    .filter(product => !product.discount)
    .sort((product1, product2) => {
      return product2.price - product1.price;
    });
};
