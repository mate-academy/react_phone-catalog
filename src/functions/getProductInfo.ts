import { request } from './getProducts';

export const getPhoneInfo = (productId: string) => {
  return request(`_new/products/${productId}.json`);
};
