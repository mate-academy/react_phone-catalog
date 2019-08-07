const basicUrl = 'https://mate-academy.github.io/phone-catalogue-static/api';

export const loadData = async(url) => {
  const response = await fetch(url);
  const data = await response.json();

  return data;
};

export const getPhones = async() => {
  const url = `${basicUrl}/phones.json`;
  const phones = await loadData(url);

  return phones;
};

export const getPhoneDetails = async(phoneId) => {
  const url = `${basicUrl}/phones/${phoneId}.json`;
  const phone = await loadData(url);

  return phone;
};
