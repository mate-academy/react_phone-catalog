export function getProducts() {
  return fetch('http://localhost:5173/api/products.json').then(response => {
    if (!response.ok) {
    }

    return response.json();
  });
}
