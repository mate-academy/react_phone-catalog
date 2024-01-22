import { Category } from '../constants/Router';
import { Product } from '../types/Product';
import { request } from '../utils/axiosHelper';

export const getProducts = (category: Category) => {
  return request<Product[]>(`products.json?category=${category}`);
};

export const getProductById = (productId: string) => {
  return request<Product>(`products/${productId}.json`);
};
