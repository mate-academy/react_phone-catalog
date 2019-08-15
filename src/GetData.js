export const getPhones = async() => {
  const url = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
  const response = await fetch(url);
  const phones = await response.json();

  return phones;
};

export const getPhoneDetails = async(url) => {
  const response = await fetch(url);
  const details = await response.json();

  return details;
};
