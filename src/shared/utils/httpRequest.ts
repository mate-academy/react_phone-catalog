const BASE_URL = import.meta.env.BASE_URL + '/api';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

const fakeDelay = (ms: number) => new Promise(res => setTimeout(res, ms));

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: unknown = null,
): Promise<T> {
  const option: RequestInit = { method };

  if (data) {
    option.body = JSON.stringify(data);
    option.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return fakeDelay(2000).then(() => {
    return fetch(BASE_URL + url, option).then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('Failed request');
    });
  });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: unknown) => request<T>(url, 'POST', data),
  patch: <T>(url: string, data: unknown) => request<T>(url, 'PATCH', data),
  delete: (url: string) => request(url, 'DELETE'),
};
