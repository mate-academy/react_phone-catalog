import { API_URL } from '../env';

const getAll = <T>(url: string): Promise<T[]> => {
  return fetch(`${API_URL}${url}.json`)
    .then(response => response.json());
};

export const getGoods = () => getAll<Good>('/products');
