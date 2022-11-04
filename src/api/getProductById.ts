import { request } from './request';
import { ProductDetails } from '../types/ProductDetails';

export const getProductById = (id: string): Promise<ProductDetails> => {
  return request(`/${id}.json`);
};
