const BASE_URL = './api';

export function getData<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url).then(response => {
    if (!response) {
      throw new Error();
    }

    return response.json();
  });
}
