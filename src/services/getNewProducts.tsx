import { Product } from '../types/Product';
import { getData } from '../utils/httpClient';

export function getNewProducts(): Promise<Product[]> {
  return getData('/products.json');
}
