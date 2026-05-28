import { Phone } from '../types/Phone';
import { Product } from '../types/Product';

export const getPhones = (): Promise<Phone[]> => {
  return fetch('/api/phones.json').then(data => data.json());
};

export const getProducts = (): Promise<Product[]> => {
  return fetch('/api/products.json').then(data => data.json());
};
