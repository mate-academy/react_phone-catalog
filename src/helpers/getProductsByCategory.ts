import { Product } from '../types/Product';
import { getData } from './HTTPClient';

export function getProductsByCategory(type?: string): Promise<Product[]> {
  return getData<Product[]>('/products.json')
    .then(response => {
      if (type) {
        return [...response].filter(product => product.category === type);
      }

      return response;
    });
}
