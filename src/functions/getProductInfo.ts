import { request } from './getProducts';

export const getPhoneInfo = (productId: number) => {
  return request(`_new/products/${productId}.json`);
};

export const getTabletInfo = (id: number) => {
  return request(`api/products/${id}.json`);
};
