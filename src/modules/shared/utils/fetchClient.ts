export const BASE_URL = './api';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export const getProduct = (url: string) => {
  return wait(300)
    .then(() => fetch(BASE_URL + url, { method: 'GET' }))
    .then(response => {
      if (!response) {
        throw new Error('Could not load data');
      }

      return response.json();
    });
};
