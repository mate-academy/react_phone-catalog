import { ProductDetailed } from '../../types/ProductDetailed';
import { getData } from '../httpClient';

export function getAccessories(): Promise<ProductDetailed[]> {
  return getData<ProductDetailed[]>('/accessories.json');
}
