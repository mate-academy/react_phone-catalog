import { Product } from '../types';
import { client } from '../utils/fetchClient';

export const getAllProducts = () => {
  return client.get<Product[]>('/api/products.json');
};
