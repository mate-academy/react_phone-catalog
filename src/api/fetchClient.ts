const BASE_URL
  = 'https://mate-academy.github.io/react_phone-catalog/api/products';

export const request = (url = '.json') => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
};
