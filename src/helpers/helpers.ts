import { getProduct } from '../api/fetchClient';
import { Product } from '../types/Product';

export const getAllProduct = async () => {
  return getProduct<Product[]>('/api/products');
};

export const getNewProduct = async () => {
  const response = await getProduct<Product[]>('/api/products');

  return response.sort((a, b) => b.year - a.year).slice(0, 10);
};
