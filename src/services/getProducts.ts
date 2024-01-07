import { Product } from '../types/Product';
import { client } from '../helpers/fetchClient';

export const getProducts = () => {
  return client.get<Product[]>('/products.json');
};
