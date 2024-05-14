import { Product } from '../types/Product';
import { getData } from '../utils/httpClient';

export function getTablets() {
  return getData<Product[]>('/accessories.json');
}
