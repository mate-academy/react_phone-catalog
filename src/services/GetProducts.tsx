import { Product } from '../types/Product';

export const GetProducts = (): Promise<Product[]> => {
  return fetch('./api/products.json').then(response => {
    return response.json();
  });
};
