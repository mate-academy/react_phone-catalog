export const getPhones = async() => {
  // eslint-disable-next-line max-len
  const url = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
  const response = await fetch(url);
  const phones = await response.json();

  return phones;
};

export const getPhoneDetails = async(id) => {
  // eslint-disable-next-line max-len
  const url = 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';
  const response = await fetch(`${url}${id}.json`);
  const phoneDetails = await response.json();

  return phoneDetails;
};
