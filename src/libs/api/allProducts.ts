import { IProduct } from '../types';
import { client } from '../utils/fetchClient';

export const getAllProducts = () => {
  return client.get<IProduct[]>('products.json');
};
