export function getProducts() {
  return fetch('https://mixelio.github.io/react_phone-catalog/api/products.json').then(response => {
    if (!response.ok) {
    }

    return response.json();
  });
}
