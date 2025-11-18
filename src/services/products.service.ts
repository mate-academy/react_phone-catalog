import { Products } from "../types/Products";

export function getProducts(): Promise<Products[]> {
  return fetch('/api/products.json').then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error('Failed to fetch products');
  });
}
