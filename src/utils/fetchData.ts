import { BASE_URL } from '../modules/constants';

const API_URL = `${BASE_URL}/api/`;

export function request<T>(url: string): Promise<T> {
  return fetch(API_URL + url).then(response => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
}
