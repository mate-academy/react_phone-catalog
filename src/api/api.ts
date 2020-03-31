import { detailsURL } from '../utils/constants';

export const getPhones = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  return response.json();
};

export const getDetails = async <T>(phones: Phone[]): Promise<Details[]> => {
  return Promise.all(
    phones.map(({ id }) => fetch(detailsURL(id)).then(res => res.json())),
  );
};
