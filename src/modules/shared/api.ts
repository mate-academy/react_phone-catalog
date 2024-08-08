export function getProducts() {
  return fetch('./api/products.json').then(response => response.json());
}
