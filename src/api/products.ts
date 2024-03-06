import { client } from '../helpers/fetch';
import { Product } from '../types/Product';

export const getProducts = (): Promise<Product[]> => {
  return client.get<Product[]>('products.json');
};
