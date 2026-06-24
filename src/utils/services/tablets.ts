import { ProductDetailed } from '../../types/ProductDetailed';
import { getData } from '../httpClient';

export function getTablets(): Promise<ProductDetailed[]> {
  return getData<ProductDetailed[]>('/tablets.json');
}
