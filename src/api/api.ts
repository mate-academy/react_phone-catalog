const BASE_URL
  = 'https://mate-academy.github.io/react_phone-catalog/api/products';

const request = (url: string) => fetch(`${BASE_URL}${url}`)
  .then(res => {
    if (!res.ok) {
      throw new Error('Something wrong...');
    }

    return res.json();
  });

export const getProducts = () => request('.json');

export const getProduct = (id: string) => request(`/${id}.json`);
