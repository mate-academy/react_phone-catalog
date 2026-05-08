import { Product } from '../types/ProductType';

const API_URL = 'api/products.json';

export async function getData(): Promise<Product[]> {
  return fetch(API_URL).then(response => response.json());
}
