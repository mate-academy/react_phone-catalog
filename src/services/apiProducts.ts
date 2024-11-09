import { Product } from '../types/Product';
import apiClient from '../utils/httpClient';

export const getProducts = (): Promise<Product[]> => {
  return apiClient.get<Product[]>('/products').then(response => response.data);
};
