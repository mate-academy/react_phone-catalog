import { Products } from '../types/Products';
import { client } from '../utils/fetchClient';

export const getProducts = () => {
  return client.get<Products[]>('/products.json');
};
