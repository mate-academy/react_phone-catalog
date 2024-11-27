import { Product } from '../types/Product';
import { client } from '../utils/httpClient';

export const getProducts = () => {
  return client.get<Product[]>('api/products.json');
};
