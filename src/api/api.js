import * as axios from 'axios';

const baseURL = 'https://mate-academy.github.io/phone-catalogue-static/api/';

export const getPhones = () => {
  return axios.get(`${baseURL}phones.json`)
    .then((response) => response.data);
};
