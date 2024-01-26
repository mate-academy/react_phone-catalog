import { ProductDetails } from '../type/ProductDetails';

export const BASE_API_URL
= 'https://mate-academy.github.io/react_phone-catalog/_new/products.json';
export const DETAILS_API_URL
= 'https://mate-academy.github.io/react_phone-catalog/_new';

export function getProduct() {
  return fetch(BASE_API_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.json();
    });
}

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

type RequestMethod = 'GET';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data?: Record<string, unknown>,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return wait(500)
    .then(() => fetch(DETAILS_API_URL + url, options))
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      if (!response.headers.get('content-type')?.includes('application/json')) {
        throw new Error('Content-type is not supported');
      }

      return response.json();
    });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
};

export const getProductDetails = (phoneId: string) => {
  return client.get<ProductDetails>(`/products/${phoneId}.json`);
};
