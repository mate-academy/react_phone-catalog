import { IGood } from '../types/IGood';
// import { IDescrition } from '../types/IDescription';

const API_URL = 'https://mate-academy.github.io/react_phone-catalog/api/';

export const request = (url: string) => {
  return fetch(`${API_URL}${url}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      return response.json();
    });
};

export const getAll = async (): Promise<IGood[]> => {
  return request('products.json');
};

export const getItem = async (name: string | undefined) => {
  return request(`products/${name}.json`);
};
