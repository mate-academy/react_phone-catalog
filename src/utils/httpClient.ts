const BASE_URL =
  // eslint-disable-next-line
  'https://srtrace.github.io/react_phone-catalog/api';

// const TEMP_BASE_URL = 'http://localhost:3000/api';

export function getData<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url).then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.text}`);
    }

    return response.json();
  });
}
