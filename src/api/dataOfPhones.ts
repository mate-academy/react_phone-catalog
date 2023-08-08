import { Phone } from '../types/phone';

const BASE_URL = '_new/products';

function getData<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url)
    .then((response) => (
      response.ok
        ? response.json()
        : Promise.reject(new Error(`${response.status}: ${response.statusText}`))
    ));
}

export const getPhones = () => getData<Phone[]>('.json');
