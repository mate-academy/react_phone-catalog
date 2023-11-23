/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
// const PRODUCTS_URL = 'https://mate-academy.github.io/react_phone-catalog/api/products.json';
const PRODUCTS_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/products.json';

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

  return wait(300)
    .then(() => fetch(url))
    .then(response => response.json());
}

export const clientGet = <T>() => request<T>(PRODUCTS_URL);
export const detailGet = <T>(id: string) => request<T>(`https://mate-academy.github.io/react_phone-catalog/_new/products/${id}.json`);
