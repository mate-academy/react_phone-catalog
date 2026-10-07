import { Product } from '../types/Product';

import productsData from './products.json';

export const getProducts = async (): Promise<Product[]> => {
  return productsData;
};
