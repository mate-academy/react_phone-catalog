import { Product } from '../types/Product';
import { getData } from '../helpers/httpClient';

export function getNewProducts(): Promise<Product[]> {
  return getData('/products.json');
}
