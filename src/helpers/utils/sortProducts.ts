import { getDiscountedPrice } from './getDiscount';
import { Product } from '../types/Product';

export const sortProducts = (products: Product[], sort: string) => {
  const sortedProducts = [...products];

  switch (sort) {
    case 'age':
      sortedProducts
        .sort((product1, product2) => product1.age - product2.age);
      break;
    case 'price':
      sortedProducts
        .sort((product1, product2) => {
          return getDiscountedPrice(product1) - getDiscountedPrice(product2);
        });
      break;
    case 'name':
      sortedProducts
        .sort((product1, product2) => {
          return product1.name.localeCompare(product2.name);
        });
      break;

    default:
      throw new Error('Unknown sort parameter!');
  }

  return sortedProducts;
};
