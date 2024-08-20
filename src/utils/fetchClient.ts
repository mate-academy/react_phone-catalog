import { Products } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = 'https://mukutiuk.github.io/react_phone-catalog/api/';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';
function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return wait(100)
    .then(() => fetch(BASE_URL + url, options))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
};

export const getProduct = () => {
  return client.get<Products[]>('products.json');
};

export const getPhoneDetails = () => {
  return client.get<ProductDetails[]>(`phones.json`);
};

export const getTabletsDetails = () => {
  return client.get<ProductDetails[]>(`tablets.json`);
};

export const getAccessoriesDetails = () => {
  return client.get<ProductDetails[]>(`accessories.json`);
};
