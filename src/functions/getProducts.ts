const apiUrl = 'https://mate-academy.github.io/react_phone-catalog/';

const wait = (delay: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
};

export const request = (url: string) => {
  return wait(500)
    .then(() => fetch(apiUrl + url))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
};

export const getProducts = () => {
  return request('api/products.json');
};
