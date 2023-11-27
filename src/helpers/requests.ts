import { Product } from '@typings/product';
import { ProductDetails } from '@typings/productDetails';

const API_URL = 'https://mate-academy.github.io/react_phone-catalog/_new';

const request = <T>(endpoint: string, signal?: AbortSignal): Promise<T> => {
  return fetch(API_URL + endpoint, { signal }).then(response => {
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    return response.json();
  });
};

export const requestProducts = () => {
  return request<Product[]>('/products.json').then(products => products);
};

export const getProductDetails = (productId: string, signal: AbortSignal) => {
  return request<ProductDetails>(`/products/${productId}.json`, signal);
};
