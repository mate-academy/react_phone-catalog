import { ProductInfo } from '../types/ProductInfo';
import { client } from '../utils/fetchClient';

export const getProducts = () => {
  return client.get<ProductInfo[]>('/products.json');
};
