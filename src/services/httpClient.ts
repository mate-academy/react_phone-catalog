// .. httpClient.ts
import type { Product } from '../types/Product';

// Гарантуємо, що після BASE_URL завжди є слеш
const BASE = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

const API_URL = `${BASE}api/products.json`;

export function getProducts(): Promise<Product[]> {
  return fetch(API_URL).then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }

    return response.json();
  });
}
