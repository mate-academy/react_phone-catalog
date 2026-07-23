import { API_URL } from '@shared/constants/paths';

const BASE_URL = API_URL;

const delay = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

export const get = <T>(url: string): Promise<T> =>
  Promise.all([
    fetch(`${BASE_URL}${url}`).then(response => {
      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      return response.json() as Promise<T>;
    }),

    delay(500),
  ]).then(([data]) => data);
