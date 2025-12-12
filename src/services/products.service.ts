import { Products } from '../types/Products';

export function getProducts(): Promise<Products[]> {
  const BASE_URL = import.meta.env.BASE_URL;

  return fetch(`${BASE_URL}/api/products.json`).then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error('Failed to fetch products');
  });
}
