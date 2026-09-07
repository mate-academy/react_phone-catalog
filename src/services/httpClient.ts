const BASE_URL = 'https://daniilbarilotti.github.io/react_phone-catalog/';

export function getData<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url).then(response => {
    if (!response.ok) {
    }

    return response.json();
  });
}
