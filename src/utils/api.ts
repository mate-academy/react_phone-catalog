import { URL } from '../constants/api';
import { PhoneInterface } from '../constants/types';

const getDataFromServer = async <T>(url: string): Promise<T> => {
  const data = await fetch(url);

  return data.json();
};

export const getPhones: () => Promise<PhoneInterface[]> = async() => {
  const phones = await getDataFromServer<PhoneInterface[]>(URL);

  return phones;
};

// eslint-disable-next-line max-len
export const getDataById = (url: string) => `https://mate-academy.github.io/phone-catalogue-static/api/phones/${url}.json`;
