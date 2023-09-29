const BASE_URL
  = 'https://mate-academy.github.io/react_phone-catalog/api/products';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

const request = (url: string) => {
  // eslint-disable-next-line prefer-template
  const fullURL = BASE_URL + url + '.json';

  return wait(300)
    .then(() => fetch(fullURL))
    .then(res => {
      if (!res.ok) {
        throw new Error();
      }

      return res.json();
    });
};

export const getProducts = () => request('');
export const getProductDetails = (id: string | undefined) => request(`/${id}`);
