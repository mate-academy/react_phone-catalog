import { Product } from '../types/Product';
import { client } from '../utils/fetchClient';

export const getProducts = () => {
  return client.get<Product[]>('/products');
};

export const getProductDetails = (productId: string) => {
  return client.get<any>(`/products/${productId}`);
};
