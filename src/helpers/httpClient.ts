const BASE_URL = 'https://anna-agerone.github.io/react_phone-catalog/api';

// const BASE_URL = './api/';

export function getData<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url).then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.text}`);
    }

    return response.json();
  });
}
