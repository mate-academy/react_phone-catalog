import { Category } from '../server/types';
import { productsRequest } from '../server/helper';

export function getProductsAmount(category?: Category) {
  return productsRequest<number>('amount.json', category);
}
