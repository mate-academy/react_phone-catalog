export const BASE_URL =
  'https://mate-academy.github.io/react_phone-catalog/_old';

function request<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url).then(response => response.json());
}

export const client = {
  get: <T>(url: string) => request<T>(url),
};
