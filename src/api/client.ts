import { withBase } from '../utils/withBase';
const API_URL = 'api';

export function getData<T>(url: string): Promise<T> {
  return fetch(withBase(`${API_URL}/${url}`)).then(response => {
    if (!response.ok) {
      throw new Error(`Unable to load ${url}`);
    }

    return response.json() as Promise<T>;
  });
}
