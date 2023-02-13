import { Product } from '../types/Product';

const API_URL = 'https://mate-academy.github.io/react_phone-catalog/api';

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export function getProducts(): Promise<Product[]> {
  return delay(1000)
    .then(() => fetch(`${API_URL}/products.json`))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export function getProduct(productId: string): Promise<Product> {
  return delay(1000)
    .then(() => fetch(`${API_URL}/products/${productId}.json`))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}
