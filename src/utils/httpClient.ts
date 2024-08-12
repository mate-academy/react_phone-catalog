// const BASE_URL = 'https://github.com/SrTrace/react_phone-catalog/tree/srtrace/react_phone-catalog-solution/src/api';
const TEMP_BASE_URL = 'http://localhost:3000/api';

export function getData<T>(url: string): Promise<T> {
  return fetch(TEMP_BASE_URL + url).then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.text}`);
    }

    return response.json();
  });
}
