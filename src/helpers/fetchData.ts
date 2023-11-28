import { DATA_URL } from '../variables';

export const fetchData = () => {
  return fetch(DATA_URL).then((response) => {
    return response.json();
  });
};
