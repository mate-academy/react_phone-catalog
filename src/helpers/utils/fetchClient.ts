/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = './api';

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
    .then(() => {
      return fetch(BASE_URL + url, options);
    })
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    })
    .catch(error => {
      // eslint-disable-next-line
      console.log(error);
    });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
};
