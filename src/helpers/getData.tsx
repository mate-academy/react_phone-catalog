// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/api/products';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export const getProducts = () => {
  return wait(300)
    .then(() => fetch(`${BASE_URL}.json`))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
};

export const getProductDetail = (id: string) => {
  return wait(300)
    .then(() => fetch(`${BASE_URL}/${id}.json`))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
};
