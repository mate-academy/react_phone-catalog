import { Product } from '../types/Product';
import { getData } from '../utils/httpClient';

export function getAccessories() {
  return getData<Product[]>('/accessories.json');
}
