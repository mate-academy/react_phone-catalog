const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/api';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function request<T>(url: string, method: RequestMethod = 'GET'): Promise<T> {
  const options: RequestInit = { method };

  return fetch(BASE_URL + url, options)
    .then(response => response.json());
}

export const client = {
  get: <T>(url: string) => request<T>(url),
};
