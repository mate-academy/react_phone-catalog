// eslint-disable-next-line max-len
export const URL_PHONE = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
// eslint-disable-next-line max-len
export const URL_DETAILS = 'https://mate-academy.github.io/phone-catalogue-static/api/phones/motorola-xoom.json';

export const getPhones = () => {
  return fetch(URL_PHONE)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
};

getPhones();
