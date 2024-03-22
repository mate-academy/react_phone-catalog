const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/api';

const handleResponse = (response: Response) => {
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const client = {
  get: <T>(url: string): Promise<T> => {
    return fetch(BASE_URL + url).then(handleResponse);
  },
};
