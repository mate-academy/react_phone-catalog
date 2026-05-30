import { Product } from '../types/data';
// eslint-disable-next-line operator-linebreak
const API_URL = `${import.meta.env.BASE_URL}/api/products.json`;

export async function getProducts(): Promise<Product[]> {
  return fetch(API_URL).then(response => response.json());
}
