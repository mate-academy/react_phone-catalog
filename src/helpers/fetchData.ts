import { DATA_URL } from '../variables';

export const fetchData = () => {
  return fetch(`${DATA_URL}/products.json`).then((response) => {
    return response.json();
  });
};
