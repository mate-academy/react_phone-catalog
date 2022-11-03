import { Product } from '../types/Product';

const API_URL
  = 'https://mate-academy.github.io/react_phone-catalog/api/products.json';

export async function getProducts(): Promise<Product[]> {
  return fetch(API_URL)
    .then(response => response.json());
}
