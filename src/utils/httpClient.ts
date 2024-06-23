const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new';

export function getData<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url).then(response => response.json());
}
