import { Product } from '../types/Product';

const mode = import.meta.env.MODE;
// : 'development' | "production"

const BASE_URL = mode === 'development' ? '/api' : '/react_phone-catalog/api';

export function getData<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url + '.json').then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`Failed to load data from ${url}`);
  });
}

export const getProducts = () => getData<Product[]>('/products');
