import * as axios from 'axios';

// eslint-disable-next-line max-len
export const baseURL = 'https://mate-academy.github.io/phone-catalogue-static/api/phones';

export const getPhones = () => {
  return axios.get(`${baseURL}.json`)
    .then((response) => response.data);
};

export const getPhoneDetails = (phoneId) => {
  return axios.get(`${baseURL}/${phoneId}.json`)
    .then((response) => response.data)
    .catch(() => {

    });
};
