export function getProducts() {
  return fetch('http://localhost:3000/api/products.json').then(response => {
    if (!response.ok) {
    }

    return response.json();
  });
}
