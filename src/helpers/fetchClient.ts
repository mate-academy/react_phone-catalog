export const BASE_API_URL
= 'https://mate-academy.github.io/react_phone-catalog/_new/products.json';

export function getProduct() {
  return fetch(BASE_API_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.json();
    });
}
