// .. httpClient.ts
import type { Product } from '../types/Product';

// import.meta.env.BASE_URL гарантує правильний шлях і на Localhost, і на GitHub Pages
const API_URL = `${import.meta.env.BASE_URL}api/products.json`;

export function getProducts(): Promise<Product[]> {
  return fetch(API_URL).then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }

    return response.json();
  });
}
