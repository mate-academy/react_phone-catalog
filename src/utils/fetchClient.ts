export const BASE_URL = 'new/';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

const request = <T>(
  url: string,
  method: RequestMethod = 'GET',
  headers?: Record<string, string>,
): Promise<T> => {
  const options: RequestInit = { method, headers };

  return fetch(BASE_URL + url, options)
    .then(res => {
      if (!res.ok) {
        throw new Error('Response not ok');
      }

      return res.json();
    });
};

export const fetchClient = {
  get: <T>(
    url: string,
    queryParams?: Record<string, string>,
    headers?: Record<string, string>) => {
    const queryString = queryParams ? `?${new URLSearchParams(queryParams)}` : '';

    return request<T>(url + queryString, 'GET', headers);
  },
  post: <T>(url: string, headers?: Record<string, string>) => {
    return request<T>(url, 'POST', headers);
  },
  patch: <T>(url: string, headers?: Record<string, string>) => {
    return request<T>(url, 'PATCH', headers);
  },
  delete: <T>(url: string, headers?: Record<string, string>) => {
    return request<T>(url, 'DELETE', headers);
  },
};
