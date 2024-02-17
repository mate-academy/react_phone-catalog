/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_API_URL = 'https://mate-academy.github.io/react_phone-catalog/';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export async function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: BodyInit | null = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset: UTF-8',
    };
  }

  const response = await fetch(BASE_API_URL + url, options);

  return response.json();
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
  patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
  delete: (url: string) => request(url, 'DELETE'),
};
