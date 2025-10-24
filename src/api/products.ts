import { client } from '../utils/fetchClient';
import { Category, Product, ProductDetails } from '../types';

export const getProducts = () => {
  return client.get<Product[]>('/products.json');
};

export const getProductsByCategory = (category: Category) => {
  return client.get<ProductDetails[]>(`/${category}.json`);
};
