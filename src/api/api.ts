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
    phones.map(({ id }) => fetch(detailsURL(id)).then(res => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }

      return res.json();
    })),
  );
};

export const getPhone = async <T>(id: string): Promise<T> => {
  // eslint-disable-next-line max-len
  const response = await fetch(`https://mate-academy.github.io/phone-catalogue-static/api/phones/${id}.json`);

  return response.json();
};
