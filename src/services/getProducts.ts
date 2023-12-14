import { Product } from '../types/Product';
import { client } from './httpClient';

export const getProducts = () => {
  return client.get<Product[]>('/products.json');
};
