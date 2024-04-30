const BASE_URL = 'https://VadimDrobyazko.github.io/react_phone-catalog';

export const getProduct = async <T>(url: string): Promise<T> => {
  const response = await fetch(BASE_URL + url);

  return response.json();
};
