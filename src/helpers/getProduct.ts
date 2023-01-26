import { request } from '../api/fetchClient';

export const getProduct = async (productId: string) => {
  return request(`/${productId}.json`);
};
