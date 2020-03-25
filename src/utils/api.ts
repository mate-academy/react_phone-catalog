import { URL } from '../constants/api';
import { Phone } from '../constants/types';

const getDataFromServer = async <T>(url: string): Promise<T> => {
  const data = await fetch(url);

  return data.json();
};

export const getPhones: () => Promise<Phone[]> = async() => {
  const users = await getDataFromServer<Phone[]>(URL);

  return users;
};
