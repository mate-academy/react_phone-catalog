import { getProduct } from '../api/fetchClient';
import { Product } from '../types/Product';

export const getAllProudct = async () => {
  return getProduct<Product[]>('/api/products.json');
};

export const getNewProduct = async () => {
  const response = await getProduct<Product[]>('/api/products.json');

  return response.sort((a, b) => b.year - a.year);
};

export const getHotProduct = async () => {
  const response = await getProduct<Product[]>('/api/products.json');

  return response.sort(
    (a, b) => b.fullPrice - a.fullPrice - (a.fullPrice - a.price),
  );
};
