const BASE = '/react_phone-catalog/';

export function getData<T>(apiEndpoint: string): Promise<T> {
  return fetch(`${BASE}api/${apiEndpoint}.json`)
    .then(response => response.json())
    .then(data => data as T)
    .catch(() => {
      throw new Error('Error fetching data');
    });
}
