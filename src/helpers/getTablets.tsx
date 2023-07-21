import { Product } from '../types/Product';

export const getTablets = (products: Product[]) => {
  return [...products].filter(product => product.type === 'tablet');
};
