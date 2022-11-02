// eslint-disable-next-line max-len
const produstsUrl = 'https://mate-academy.github.io/react_phone-catalog/api/products.json';

export const getProducts = () => {
  return fetch(produstsUrl).then(response => response.json());
};
