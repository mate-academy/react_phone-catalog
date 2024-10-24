import { Product } from '../types/Product';
import { client } from './fetch';

export function getProducts(): Promise<Product[]> {
  return client.get<Product[]>('products.json');
}
