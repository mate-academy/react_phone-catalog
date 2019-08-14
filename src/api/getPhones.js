export const getPhones = async() => {
  const url = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';

  const response = await fetch(url);
  const phone = await response.json();

  return phone;
};

export const getPhoneDetails = async(phoneId) => {
  const url = `https://mate-academy.github.io/phone-catalogue-static/api/phones/${phoneId}.json`;

  const response = await fetch(url);
  const phoneDetail = await response.json();

  return phoneDetail;
};
