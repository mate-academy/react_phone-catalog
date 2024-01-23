/* eslint-disable max-len */
export const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
): Promise<T> {
  const options: RequestInit = { method };

  return fetch(BASE_URL + url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export const fetchClient = {
  get: <T>(url: string) => request<T>(url),
};
