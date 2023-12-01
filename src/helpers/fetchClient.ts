export const BASE_API_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/products.json';

export function getProduct() {
  return fetch('https://mate-academy.github.io/react_phone-catalog/_new/products.json')
    .then((response) => {
      if (!response.ok) {

      }

      return response.json();
    });
}
