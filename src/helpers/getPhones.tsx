import { Product } from '../types/Product';

export const getPhones = (products: Product[]) => {
  return [...products].filter(product => product.type === 'phone');
};
