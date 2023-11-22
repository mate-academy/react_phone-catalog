import { request } from './getProducts';

export const getPhones = () => {
  return request('_new/products.json');
};
