import { ProductDetailed } from '../../types/ProductDetailed';
import { getData } from '../httpClient';

export function getPhones(): Promise<ProductDetailed[]> {
  return getData<ProductDetailed[]>('/phones.json');
}
