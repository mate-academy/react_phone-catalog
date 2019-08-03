/* eslint-disable implicit-arrow-linebreak */
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/api';
const PHONES = '/phones';

export const getPhones = () =>
  fetch(`${proxyUrl}${BASE_URL}${PHONES}.json`)
    .then(response => response.json())
    .then(error => error);

export const getExtraDetails = id =>
  fetch(`${proxyUrl}${BASE_URL}${PHONES}/${id}.json`)
    .then(response => response.json())
    .then(error => error);
