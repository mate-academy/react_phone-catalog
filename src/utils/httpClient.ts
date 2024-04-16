import { BASE_URL } from './const';

export const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(BASE_URL + url);

  return response.json();
};
