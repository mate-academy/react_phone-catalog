import { CategoryProduct } from '../types/CategoryProduct';
import { Product } from '../types/Product';
import { client } from './fetch';

export const getProducts = (): Promise<Product[]> => {
  return client.get<Product[]>('products.json');
};

export const getProductsByCategory = (
  category: string,
): Promise<CategoryProduct[]> => {
  return client.get<CategoryProduct[]>(`${category}.json`);
};
