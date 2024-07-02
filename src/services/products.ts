import { getData } from '../utils/httpClient';

export const getProducts = () => {
  return getData('products.json').then(products => products);
};
