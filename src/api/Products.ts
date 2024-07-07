import { ProductGeneral } from '../types/ProductGeneral';
import { getData } from '../utils/fetchClient';

export function getProductsItems() {
  return getData<ProductGeneral[]>('/products.json');
}
