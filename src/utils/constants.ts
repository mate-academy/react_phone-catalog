/* eslint-disable max-len */
export const PHONES_URL = 'https://alexandershpilka.github.io/phones_api/api/phones.json';
export const detailsURL = (id: string) => `https://alexandershpilka.github.io/phones_api/api/phones/${id}.json`;
export const MAIN_URL = 'https://alexandershpilka.github.io/phones_api/';
export const LOAD_PHONES = 'LOAD_PHONES';
export const LOAD_PHONE = 'LOAD_PHONE';
export const getPhoneId = (phoneId: string) => {
  const arr = phoneId.split('-');

  arr.length -= 2;

  return arr.join('-');
};
