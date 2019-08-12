const APIURL = 'https://mate-academy.github.io/phone-catalogue-static/api';

export const getData = async(url) => {
  const response = await fetch(url);
  const data = response.json();

  return data;
};

export const getPhones = async() => {
  const phones = getData(`${APIURL}/phones.json`);

  return phones;
};

export const getDetails = async(phoneId) => {
  const phonesDetails = getData(`${APIURL}/${phoneId}.json`);

  return phonesDetails;
};
