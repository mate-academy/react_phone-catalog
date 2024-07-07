const BASE_URL = 'https://yuliiacat.github.io/react_phone-catalog/api';

export function getData(url: string) {
  return fetch(BASE_URL + url).then(response => {
    if (!response.ok) {
    }

    return response.json();
  });
}
