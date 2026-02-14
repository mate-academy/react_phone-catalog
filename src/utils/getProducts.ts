import { Product } from '../types/Product';
import { fetchData } from './fetchData';

export function getProducts(): Promise<Product[]> {
  return fetchData('/products.json');
}
