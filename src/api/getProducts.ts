import { Product } from '../types/Product';
import { request } from './request';

export const getProducts = (): Promise<Product[]> => {
  return request('.json');
};
