import { client } from '../fetchClient';
import { Product } from '../../features/types/Product';

export const getAllProducts = () => {
  return client.get<Product[]>('/products.json');
};
