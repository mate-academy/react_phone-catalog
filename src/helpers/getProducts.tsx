// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/api/products';

export const request = () => {
  return fetch(`${BASE_URL}.json`)
    .then(response => {
      if (!response.ok) {
        throw Error(`${response.status}`);
      }

      return response.json();
    });
};
