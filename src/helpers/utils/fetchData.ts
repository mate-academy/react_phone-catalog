import { Phone } from '../../Types/Phone';

// eslint-disable-next-line
const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/products.json';

function getData<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url)
    .then(response => response.json());
}

function getPhones() {
  return getData<Phone[]>('');
}

export const client = {
  fetchPhones: () => getPhones(),
};
