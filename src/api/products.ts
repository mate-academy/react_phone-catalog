import { Product } from '../types/products';
import { client } from '../utils/axiosClient';

export const getProducts = () => {
  return client.get<Product[]>('/products.json');
};
