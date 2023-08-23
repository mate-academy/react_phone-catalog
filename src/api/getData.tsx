import { Product } from '../types/Product';
import { ProductInfo } from '../types/ProductInfo';
import { client } from '../utils/fetchClient';

export const getProducts = async () => {
  return client.get<Product[]>('/products.json');
};

export const getTablets = async () => {
  return client.get<Product[]>('/products.json');
};

export const getDescription = async (id: string) => {
  return client.get<ProductInfo>(`/products/${id}.json`);
};
