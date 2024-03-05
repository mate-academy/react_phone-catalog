const BASE_URL = 'http://localhost:3000/api/products.json';

export function getProducts() {
  return fetch(BASE_URL).then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return response.json();
  });
}
