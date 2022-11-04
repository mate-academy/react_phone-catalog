const BASE_URL
  = 'https://mate-academy.github.io/react_phone-catalog/api/products';

async function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export const request = (url: string) => {
  return wait(300)
    .then(() => fetch(BASE_URL + url))
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
};
