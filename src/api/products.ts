import { Product } from '../types/Product';

const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new';

export function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

const request = <T>(url: string): Promise<T> => {
  return wait(0)
    .then(() => fetch(BASE_URL + url))
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.json();
    });
};

export const getProducts = (): Promise<Product[]> => request('/products.json');
export const getProductDetails = (
  productId: string,
): Promise<Product> => request(`/products/${productId}.json`);
