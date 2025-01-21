import { getData } from '../utils/fetchClient';

import { Product } from '../types/Product';

export const getProducts = () => {
  return getData<Product[]>('/products.json');
};
