import { getData } from '@utils/fetchClient';

import { Product } from '@sTypes/Product';

export const getProducts = () => {
  return getData<Product[]>('/products.json');
};
