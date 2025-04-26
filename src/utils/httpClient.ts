const BASE_URL = 'https://antonshtef.github.io/react_phone-catalog/api/';

export function getData<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url).then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.text}`);
    }

    return response.json();
  });
}
