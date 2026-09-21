import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

const BASE_URL = '/api';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export function getProducts(): Promise<Product[]> {
  return wait(500)
    .then(() => fetch(`${BASE_URL}/products.json`))
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      return response.json();
    });
}

// Нова функція для деталей товару
export function getProductById(productId: string): Promise<ProductDetails> {
  return wait(500)
    .then(() => fetch(`${BASE_URL}/products/${productId}.json`))
    .then(response => {
      if (!response.ok) {
        throw new Error('Product not found');
      }

      return response.json();
    });
}
