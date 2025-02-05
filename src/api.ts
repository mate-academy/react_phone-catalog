import { Product } from './types/Product';
import products from '../public/api/products.json';

export function getProducts(): Promise<Product[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(products);
    }, 500);
  });
}
