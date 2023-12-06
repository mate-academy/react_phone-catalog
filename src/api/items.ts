/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/api/';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function request<T>(
  url: string,
): Promise<T> {
  const options: RequestInit = { method: 'GET' };

  return wait(100)
    .then(() => fetch(BASE_URL + url, options))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export const get = <T>(url: string) => request<T>(url);
