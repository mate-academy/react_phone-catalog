/* eslint-disable no-console */
export function getData<T>(apiEndpoint: string): Promise<T> {
  return fetch(import.meta.env.BASE_URL + '/api/' + apiEndpoint + '.json')
    .then(response => response.json())
    .then(data => {
      return data as T;
    })
    .catch(() => {
      throw new Error('Error fetching data');
    });
}

console.log(import.meta.env.BASE_URL);
