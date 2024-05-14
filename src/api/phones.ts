import { Product } from '../types/Product';
import { getData } from '../utils/httpClient';

export function getPhones() {
  return getData<Product[]>('/phones.json');
}
