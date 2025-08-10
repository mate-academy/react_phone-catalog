import { Product } from '../../types/Product';
import { getData } from '../httpClient';

export function getProducts(): Promise<Product[]> {
  return getData<Product[]>('/products.json');
}
