// const BASE_URL = './api/';

import { BASE_URL } from "./modules/constants/URL's/URL's";

// const DEFAULT_HEADERS = {
//   'Content-Type': 'application/json; charset=utf-8',
// };

export const handleResponse = (response: Response) => {
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
};

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export const client = {
  get<T>(url: string): Promise<T> {
    return wait(500).then(() => fetch(BASE_URL + url).then(handleResponse));
    // return fetch(BASE_URL + url).then(handleResponse);
  },

  // post<T>(url: string, data: any): Promise<T> {
  //   const options = {
  //     method: 'POST',
  //     body: JSON.stringify(data),
  //     headers: DEFAULT_HEADERS,
  //   };

  //   return fetch(BASE_URL + url, options).then(handleResponse);
  // },

  // patch<T>(url: string, data: any): Promise<T> {
  //   const options = {
  //     method: 'PATCH',
  //     body: JSON.stringify(data),
  //     headers: DEFAULT_HEADERS,
  //   };

  //   return fetch(BASE_URL + url, options).then(handleResponse);
  // },

  // delete<T>(url: string): Promise<T> {
  //   return fetch(BASE_URL + url, { method: 'DELETE' }).then(handleResponse);
  // },
};
