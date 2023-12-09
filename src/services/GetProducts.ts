import { Product } from '../types/Product';
import { client } from './FethClient';

export const getProducts = () => {
  return client.get<Product[]>('/products.json');
};
