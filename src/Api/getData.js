export const getData = () => {
  const URL = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
  const phones = fetch(URL)
    .then(response => response.json())
  return phones;
};

export const getPhonesData = async(id) => {
  const phone = `https://mate-academy.github.io/phone-catalogue-static/api/phones/${id}.json`;
  const phoneData = await fetch(phone);
  const phoneDetails = await phoneData.json();

  return phoneDetails;
};
