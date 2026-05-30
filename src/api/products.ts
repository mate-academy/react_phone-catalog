import { ProductGeneral } from '../types/ProductGeneral';
import { getData } from '../utils/httpClient';

export function getProducts() {
  return getData<ProductGeneral[]>('/products.json');
}
