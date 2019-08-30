export const getData = async() => {
  const allPhones
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
  const phoneCalatog = await fetch(allPhones);
  const phones = await phoneCalatog.json();

  return phones;
};

export const getPhonesData = async(id) => {
  const phone
  = `https://mate-academy.github.io/phone-catalogue-static/api/phones/${id}.json`;
  const phoneData = await fetch(phone);
  const phoneDetails = await phoneData.json();

  return phoneDetails;
};
