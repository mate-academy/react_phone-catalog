import { Product } from '../types/Product';

// eslint-disable-next-line
const BASE_URL = 'https://mrsvolodya.github.io/react_phone-catalog/api';

export function getData<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url).then(response => response.json());
}

export function getProducts() {
  return getData<Product[]>('/products.json').then(products => products);
}
