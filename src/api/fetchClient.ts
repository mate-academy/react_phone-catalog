const BASE_URL =
  'https://github.com/mate-academy/react_phone-catalog/blob/master/public';

export const getProduct = async <T>(url: string): Promise<T> => {
  const response = await fetch(BASE_URL + url);

  return response.json();
};
