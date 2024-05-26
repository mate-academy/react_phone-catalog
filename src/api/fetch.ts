const BASE_URL = 'http://localhost:3000/';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
};

export const getItems = async (url: string) => {
  return wait(300)
    .then(() => fetch(BASE_URL + url))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json;
    });
};
