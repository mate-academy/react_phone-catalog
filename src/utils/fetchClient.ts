/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = '/api';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function request<T>(url: string): Promise<T> {
  return wait(3)
    .then(() => fetch(BASE_URL + url))
    .then(response => response.json());
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  // post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
  // patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
  // delete: (url: string) => request(url, 'DELETE'),
};
