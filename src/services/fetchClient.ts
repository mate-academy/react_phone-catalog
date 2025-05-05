const BASE_URL = 'https://mrzefirchk.github.io/react_phone-catalog/api/';
// const TEST_URL = 'http://localhost:5173/api/';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export function getData<T>(url: string): Promise<T> {
  return wait(2000)
    .then(() => fetch(BASE_URL + url))
    .then(response => response.json());
}
