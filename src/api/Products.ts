import { getData } from '../utils/fetchClient';
import { ProductGeneral } from '../types/ProductGeneral';

export function getProducts() {
  return getData<ProductGeneral[]>('/products.json');
}
