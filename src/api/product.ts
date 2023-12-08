import { Product } from '../types/Product';
import { client } from '../utils/fetchClient';

export const getProducts = () => {
  return client.get<Product[]>('.json');
};

export const getProduct = (id: string) => {
  return client.get<Product>(`/${id}.json`);
};
