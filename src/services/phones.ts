import { ProductDetailed } from '../types/types';
import { getData } from '../utils/httpClient';

export function getPhones() {
  return getData<ProductDetailed[]>('/phones.json');
}
