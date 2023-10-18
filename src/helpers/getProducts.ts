/* eslint-disable max-len */
export const getProducts = () => {
  const URL = 'https://mate-academy.github.io/react_phone-catalog/api/products.json';

  return fetch(URL)
    .then((response) => response.json());
};

export const getDetails = (productId: string) => {
  const URL = `https://mate-academy.github.io/react_phone-catalog/api/products/${productId}.json`;

  return fetch(URL)
    .then((response) => response.json());
};
