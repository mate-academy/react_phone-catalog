// const BASE_URL = 'https://janeshavrukova.github.io/react_phone-catalog/api';

const BASE_URL = 'http://localhost:3000/api';

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
