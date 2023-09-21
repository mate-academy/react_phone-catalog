/* eslint-disable @typescript-eslint/no-explicit-any */
type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function request<T>(
  baseUrl: string,
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

  return fetch(baseUrl + url, options)
    .then(response => {
      return response.json();
    })
    .catch(error => {
      throw error;
    });
}

export const client = {
  get: <T>(baseUrl: string, url: string) => request<T>(baseUrl, url),
  post: <T>(
    baseUrl: string,
    url: string,
    data: any,
  ) => request<T>(baseUrl, url, 'POST', data),
  patch: <T>(
    baseUrl: string,
    url: string,
    data: any,
  ) => request<T>(baseUrl, url, 'PATCH', data),
  delete: (baseUrl: string, url: string) => request(baseUrl, url, 'DELETE'),
};
