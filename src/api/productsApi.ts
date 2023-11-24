import { client } from '../helpers/httpClient';
import { Product } from '../types/Product';

export const getProducts = () => {
  return client.get<Product[]>('products.json');
};
