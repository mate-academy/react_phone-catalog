import { Product } from '../types/product';
import { ProductDetails } from '../types/productDetails';

const API_URL = 'https://mate-academy.github.io/react_phone-catalog/_new';

const request = <T>(endpoint: string): Promise<T> => {
  return fetch(API_URL + endpoint).then(response => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
};

export const requestProducts = () => {
  return request<Product[]>('/products.json').then(products => products);
};

export const getProductDetails = (productId: string) => {
  return request<ProductDetails>(`/products/${productId}.json`);
};
