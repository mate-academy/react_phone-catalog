import { API_URL } from './constants';

const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  return response.json();
};

export const getPhones = async(): Promise<Phone[]> => {
  const phones: Phone[] = await getData(API_URL);

  return phones;
};
