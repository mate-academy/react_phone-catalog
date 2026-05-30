const BASE_URL = 'api/';

export const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(BASE_URL + url + '.json');

  if (!response.ok) {
    throw new Error(`Failed to load data from ${url}`);
  }

  return response.json();
};
