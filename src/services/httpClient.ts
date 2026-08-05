// .. httpClient.ts
import type { Product } from '../types/Product';

const API_URL = 'api/products.json';

export function getProducts(): Promise<Product[]> {
  return fetch(API_URL).then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }

    return response.json();
  });
}
