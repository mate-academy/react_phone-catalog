/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = (
  'https://mate-academy.github.io/react_phone-catalog/api'
);

type RequestMethod = 'GET';

async function request<T>(
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

  const response = await fetch(BASE_URL + url, options);

  if (!response.ok) {
    throw new Error();
  }

  return response.json();
}

export const client = {
  get: <T>(url: string) => request<T>(url),
};
