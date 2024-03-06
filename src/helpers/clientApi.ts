// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/api';

type RequestMethod = 'GET';

function request<T>(url = '', method: RequestMethod = 'GET'): Promise<T> {
  const options: RequestInit = { method };

  return fetch(BASE_URL + url, options).then((response) => response.json());
}

export const client = {
  get: <T>(url?: string) => request<T>(url),
};
