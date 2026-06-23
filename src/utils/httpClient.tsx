const BASE_URL = 'api';

export function httpClient<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url).then(response => {
    return response.json();
  });
}
