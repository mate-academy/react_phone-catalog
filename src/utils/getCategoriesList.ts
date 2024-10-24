import { Product } from '../types/Product';

export function getCategoriesList(products: Product[]) {
  return new Set(products.map(product => product.category));
}
