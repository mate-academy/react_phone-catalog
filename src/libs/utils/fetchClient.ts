/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_API_URL = '/.';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

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

  await wait(300);

  return response.json();
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
  patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
  delete: (url: string) => request(url, 'DELETE'),
};
