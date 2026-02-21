const BASE_URL = 'https://denlysiak.github.io/react_phone-catalog/api/';

export function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export function getData<T>(url: string): Promise<T> {
  return wait(1500)
    .then(() => fetch(BASE_URL + url))
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.text}`);
      }

      return response.json();
    });
}
