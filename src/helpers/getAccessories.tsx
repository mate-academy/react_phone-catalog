import { Product } from '../types/Product';

export const getAccessories = (products: Product[]) => {
  return [...products].filter(product => product.type === 'accessory');
};
