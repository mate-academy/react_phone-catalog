import { request } from './client';
import type { Product } from '../types';

export function getAllProducts() {
  return request<Product[]>('/products.json');
}
