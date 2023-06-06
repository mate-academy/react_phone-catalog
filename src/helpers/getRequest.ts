const API_URL
  = 'https://mate-academy.github.io/react_phone-catalog/api/';

export const request = <T>(endpoint: string):Promise<T> => {
  return fetch(API_URL + endpoint).then(response => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
};
