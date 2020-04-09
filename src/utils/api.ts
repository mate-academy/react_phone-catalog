import { URL } from '../constants/api';
import { PhoneInterface, PhoneDetailsInterface } from '../constants/types';

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
export const getDataById = (url: string) => `https://mate-academy.github.io/phone-catalogue-static/api/phones/${url}.json`;

export function searchCallback(query: string) {
  return (phone: PhoneInterface) => phone.name.toLowerCase().includes(query);
}
