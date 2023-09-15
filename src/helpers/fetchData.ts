/* eslint-disable max-len */
const NEW_PRODUCTS_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/products.json';
const PRODUCT_DETAILS = 'https://mate-academy.github.io/react_phone-catalog/_new/products/';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export const getProductsList = () => {
  return wait(500)
    .then(() => fetch(NEW_PRODUCTS_URL))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
};

export const getProductDetails = (productId: string) => {
  return wait(500)
    .then(() => fetch(`${PRODUCT_DETAILS}${productId}.json`))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
};
