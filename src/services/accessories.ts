import { ProductDetailed } from '../types/types';
import { getData } from '../utils/httpClient';

export function getAccessories() {
  return getData<ProductDetailed[]>('/accessories.json');
}
