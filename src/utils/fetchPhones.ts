/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/api';

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
    // We add body and Content-Type only for the requests with data
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return wait(300)
    .then(() => fetch(BASE_URL + url, options))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export const product = {
  get: (url: string) => request(url),
  post: (url: string, data: any) => request(url, 'POST', data),
  patch: (url: string, data: any) => request(url, 'PATCH', data),
  delete: (url: string) => request(url, 'DELETE'),
};
