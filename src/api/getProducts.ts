import { client } from '../helpers/fetchClient';
import { Product } from '../helpers/types/Product';

export const getProducts = () => {
  return client.get<Product[]>('/products.json');
};
