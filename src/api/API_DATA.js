
export const loadPhonesAPI  = async() => {
  const urlPhonesAPI  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
  const responsePhonesAPI  = await fetch(urlPhonesAPI);
  const PhonesAPI = await responsePhonesAPI.json();

  return PhonesAPI;
};

export const loadPhoneDetailsAPI   = async(url) => {
  const urlPhoneDetailsAPI  = `https://mate-academy.github.io/phone-catalogue-static/api/phones/${url}.json`;
  const responsePhoneDetailsAPI  = await fetch(urlPhoneDetailsAPI);
  const PhoneDetailsAPI = await responsePhoneDetailsAPI.json();

  return PhoneDetailsAPI;
};



