import { Phone } from '../types/Phone';
// eslint-disable-next-line max-len
const API = 'https://mate-academy.github.io/react_phone-catalog/api/products';

export const useFetch = () => {
  const getFetch = async (): Promise<Phone[]> => {
    const res = await fetch(`${API}.json`);

    if (!res.ok) {
      throw new Error(`${res.status}:\n ${res.statusText} `);
    }

    const response: Phone[] = await res.json();

    return response;
  };

  const getDetailsFetch = async (product: string) => {
    const res = await fetch(`${API}/${product}.json`);

    if (!res.ok) {
      throw new Error(`${res.status}:\n ${res.statusText} `);
    }

    const response = await res.json();

    return response;
  };

  return { getFetch, getDetailsFetch };
};
