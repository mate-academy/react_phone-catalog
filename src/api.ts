import { detailsURL } from '../utils/constants';

export const getPhones = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export const getDetails = async <T>(phones: Phone[]): Promise<Details[]> => {
  return Promise.all(
    phones.map(({ phoneId }) => fetch(detailsURL(phoneId)).then(res => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }

      return res.json();
    })),
  );
};

export const getPhone = async <T>(id: string): Promise<T> => {
  // eslint-disable-next-line max-len
  const response = await fetch(detailsURL(id));

  return response.json();
};