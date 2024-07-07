// const BASE_URL = 'https://yuliiacat.github.io/react_phone-catalog/';

export function getData<T>(url: string): Promise<T> {
  return fetch(url).then(response => {
    if (!response.ok) {
    }

    return response.json();
  });
}
