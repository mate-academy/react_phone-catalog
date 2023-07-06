const BASE_URL
  = 'https://mate-academy.github.io/react_phone-catalog/api/products';

// This function creates a promime
// that is resolved after a given delay
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

// function print(value: Product[]) {
//   console.log(value);
// }

// function logError(error: Error) {
//   console.warn('Error occured:', error);
// }

// getProducts()
//   .then(print);
//   // .catch(logError);

export const getProducts = () => request('');
export const getProductDetails = (id: string) => request(`/${id}`);
