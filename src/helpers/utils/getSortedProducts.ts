import sampleSize from 'lodash.samplesize';

import { Product } from '../types/Product';
import { getDiscountAmount } from './getDiscount';

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

export const getSuggestedProducts = (
  products: Product[],
  productId: string,
) => {
  const suggestedProducts = products
    .filter(product => product.id !== productId);

  return sampleSize(suggestedProducts, 8);
};
