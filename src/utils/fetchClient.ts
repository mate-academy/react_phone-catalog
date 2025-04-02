const BASE_URL = 'https://mrzefirchk.github.io/react_phone-catalog/api/';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export function getData<T>(url: string): Promise<T> {
  return wait(300)
    .then(() => fetch(BASE_URL + url))
    .then(response => response.json());
}
