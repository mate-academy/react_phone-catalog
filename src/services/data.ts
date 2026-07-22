const API_URL = 'api';

export const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(API_URL + url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${API_URL + url}`);
  }

  return response.json();
};
