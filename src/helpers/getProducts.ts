import { request } from '../api/fetchClient';

export const getProducts = async () => {
  return request()
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
};
