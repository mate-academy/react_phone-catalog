const url = 'https://mate-academy.github.io/phone-catalogue-static/api/phones';

export const getPhones = async() => {
  const response = await fetch(`${url}.json`);
  const phones = await response.json();

  return phones;
};

export const getPhoneDetails = async(id) => {
  const response = await fetch(`${url}/${id}.json`);
  const phoneDetails = await response.json();

  return phoneDetails;
};
