/* eslint-disable no-console */
export function getData<T>(apiEndpoint: string): Promise<T> {
  return fetch('/api/' + apiEndpoint + '.json')
    .then(response => response.json())
    .then(data => {
      return data as T;
    })
    .catch(() => {
      throw new Error('Error fetching data');
    });
}
