const BASE_URL = 'http://localhost:5173/api';

export function httpClient<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url).then(response => {
    return response.json();
  });
}
