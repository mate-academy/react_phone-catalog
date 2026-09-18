import { Product } from '../types/Product';

const BASE_URL = '/api';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export function getProducts(): Promise<Product[]> {
  return wait(500) // для Loader
    .then(() => fetch(`${BASE_URL}/products.json`))
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      return response.json();
    });
}
