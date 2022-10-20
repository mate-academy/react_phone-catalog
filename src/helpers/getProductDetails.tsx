// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/api/products';

export const requestDetails = (productId: string) => {
  return fetch(`${BASE_URL}/${productId}.json`)
    .then(response => {
      if (!response.ok) {
        throw Error(`${response.status}`);
      }

      return response.json();
    });
};
