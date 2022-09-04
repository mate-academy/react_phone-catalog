// import { Phone } from './types/Phone'

// eslint-disable-next-line max-len
const products = 'https://mate-academy.github.io/react_phone-catalog/api/products.json';

export const getPhones = () => {
  return fetch(products).then(responce => {
    if (!responce.ok) {
      throw new Error();
    }

    return responce.json();
  });
};
