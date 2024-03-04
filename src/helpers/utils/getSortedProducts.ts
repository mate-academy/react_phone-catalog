import sampleSize from 'lodash.samplesize';

import { Product } from '../types/Product';
import { getDiscountAmount, hasDiscount } from './getDiscount';

export const getHotProducts = (products: Product[]) => {
  return products
    .filter(product => hasDiscount(product))
    .sort((product1, product2) => {
      return getDiscountAmount(product2) - getDiscountAmount(product1);
    })
    .slice(0, 8);
};

export const getNewProducts = (products: Product[]) => {
  return [...products]
    .sort((product1, product2) => {
      return product2.year - product1.year;
    })
    .slice(0, 8);
};

export const getSuggestedProducts = (
  products: Product[],
  productId: string,
) => {
  const suggestedProducts = products
    .filter(product => product.phoneId !== productId);

  return sampleSize(suggestedProducts, 8);
};
