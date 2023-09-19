const BASE_URL = '/vlkzmn.github.io/react_phone-catalog/_new';

export function getData<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      return response.json();
    });
}
