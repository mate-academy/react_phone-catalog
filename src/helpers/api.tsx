const PRODUCTS_URL = 'https://mate-academy.github.io/react_phone-catalog/api/products.json';

export const getProducts = () => {
  return fetch(PRODUCTS_URL)
    .then(products => products.json())
    .catch(() => false);
};
