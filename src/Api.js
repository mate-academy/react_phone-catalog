const baseUrl = 'https://mate-academy.github.io/phone-catalogue-static/api';

const getResponse = async (url) => {
  const response = await fetch(url);

  return response.json();
};

export const getPhones = () => {
  return getResponse(`${baseUrl}/phones.json`);
};

export const getPhoneDetailsById = (id) => {
  return getResponse(`${baseUrl}/phones/${id}.json`);
}
