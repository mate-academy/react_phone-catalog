export const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog';
// eslint-disable-next-line max-len
const mainLink = 'https://mate-academy.github.io/react_phone-catalog/api/products';

export const getPhones = () => {
  return fetch(`${mainLink}.json`).then(responce => {
    if (!responce.ok) {
      throw new Error();
    }

    return responce.json();
  });
};

export const getCurrPhone = (phoneId: string) => {
  return fetch(`${mainLink}/${phoneId}.json`).then(responce => {
    if (!responce.ok) {
      throw new Error();
    }

    return responce.json();
  });
};
