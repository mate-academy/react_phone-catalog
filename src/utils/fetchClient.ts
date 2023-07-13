import { Phone } from '../type/Phone';

const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

type Data = Phone | Partial<Phone> | null;

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: Data = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return wait(600)
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
  post: <T>(url: string, data: Data) => request<T>(url, 'POST', data),
  patch: <T>(url: string, data: Data) => request<T>(url, 'PATCH', data),
  delete: (url: string) => request(url, 'DELETE'),
};
