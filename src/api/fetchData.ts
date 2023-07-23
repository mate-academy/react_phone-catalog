import { Product } from '../types/Product';
import { DetailedProduct } from '../types/DetailedProduct';

const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/';

function request<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url).then(response => {
    if (!response.ok) {
      throw new Error('Can not load data from server');
    }

    return response.json();
  });
}

export const getProducts = () => {
  return request<Product[]>('/products.json');
};

export const getProductById = (id: string) => {
  return request<DetailedProduct>(`/products/${id}.json`);
};
