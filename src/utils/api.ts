import { URL } from '../constants/api';
import {
  PhoneInterface,
  PhoneDetailsInterface,
  CartInterface,
} from '../constants/types';

const getDataFromServer = async <T>(url: string): Promise<T> => {
  const data = await fetch(url);

  return data.json();
};

export const getPhones: () => Promise<PhoneInterface[]> = async() => {
  const phones = await getDataFromServer<PhoneInterface[]>(URL);

  return phones;
};

export const getDetails: (url: string)
=> Promise<PhoneDetailsInterface> = async(url: string) => {
  const details = await getDataFromServer<PhoneDetailsInterface>(url);

  return details;
};

// eslint-disable-next-line max-len
export const getDataById = (url: string) => `https://alexandershpilka.github.io/phones_api/api/phones/${url}.json`;

export function searchCallback(query: string) {
  return (phone: PhoneInterface) => phone.name.toLowerCase().includes(query);
}

export const inFavouritesChecker = (uniqueKey: string, arr: string[]) => {
  return arr.includes(uniqueKey);
};

export function inCartChecker(uniqueKey: string, arr: CartInterface[]) {
  if (!arr.length) {
    return false;
  }

  if (arr.length) {
    return arr.map(item => item.id).includes(uniqueKey);
  }

  return false;
}
