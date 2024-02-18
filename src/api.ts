const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/api';

export function fetchProducts() {
  const URL = `${BASE_URL}/products.json`;

  return fetch(URL).then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return response.json();
  });
}
