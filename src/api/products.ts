import { ProductGeneral } from '../types/ProductGeneral';
import { getData } from '../utils/httpClient';

export function getProducts() {
  return getData<ProductGeneral[]>('/products.json');
}

export function getNewProducts() {
  return getData<ProductGeneral[]>('/products.json').then(products => {
    return products
      .filter((product, index) => product.year >= 2022 && index % 3 === 0)
      .slice(0, 5);
  });
}
