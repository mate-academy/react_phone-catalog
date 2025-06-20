const BASE_URL_API = '../../../../public/api/';

export const getPhonesData = () => {
  return fetch(`${BASE_URL_API}phones.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Cant get data');
      }

      return response.json();
    })
    .catch(error => {
      console.error(error);
    });
};
