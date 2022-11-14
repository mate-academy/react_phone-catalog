/* eslint-disable max-len */
const productUrl = 'https://mate-academy.github.io/react_phone-catalog/api/products.json';

export const getProducts = () => {
  return fetch(productUrl).then(response => response.json());
};
