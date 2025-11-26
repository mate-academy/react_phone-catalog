const BASE_URL = './api/';

export function getData<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url + '.json').then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`Failed to load data from ${url}`);
  });
}
