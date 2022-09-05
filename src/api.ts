import { Product } from './types/Product';

const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/api';

// https://mate-academy.github.io/react_phone-catalog/api/products/motorola-xoom.json

function get<T>(url: string): Promise<T> {
  const fullURL = `${BASE_URL} + ${url} + .json`;

  return fetch(fullURL)
    .then(res => res.json());
}

export const getProducts = () => get<Product[]>('/products.json');

export const getProduct = (productName: string) => get<Product>(`/${productName}`);
