import { TabAccessPhone } from '../types/tabAccessPhones';
const BASE_URL = 'https://hanna-balabukha.github.io/react_phone-catalog/api/';

export function getProduct(Url: string) {
  return fetch(BASE_URL + Url).then(response => {
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
    .then(() => fetch(url, options))
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
  return client.get<TabAccessPhone>(`${BASE_URL}${phoneId}.json`);
};
