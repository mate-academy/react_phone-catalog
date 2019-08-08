const phonesUrl
= 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';

const phoneDetailUrl
= 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';

export const getPhones = async() => {
  const responsePhones = await fetch(phonesUrl);
  const phones = await responsePhones.json();

  return phones;
};

export const getPhoneDetail = async(phoneId) => {
  const responseDetail = await fetch(`${phoneDetailUrl}${phoneId}.json`);
  const detail = await responseDetail.json();

  return detail;
};
