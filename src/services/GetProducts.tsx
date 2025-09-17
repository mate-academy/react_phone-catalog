import { Product } from '../types/Product';

export const GetProducts = (): Promise<Product[]> => {
  return fetch('./api/products.json').then(response => {
    return response.json();
  });
};

export const DeleteProduct = (): Promise<Product[]> => {
  return fetch(`./api/products/.json`, { method: 'DELETE' }).then(response => {
    return response.json();
  });
};
