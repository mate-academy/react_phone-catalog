const BASE_URL = `http://localhost:3000`;

export const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(BASE_URL + url);

  return response.json();
};
