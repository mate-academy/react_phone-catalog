import { Product } from '../types/Product';

export const getProducts: () => Promise<Product[]> = () => {
  // let productsFromApi: Product[] = [];

  return fetch('/api/products.json')
    .then(response => response.json())
    .then(parsed => {
      return parsed;
    });
};
