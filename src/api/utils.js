const phonesUrl
= 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';

const getData = async() => {
  const responsePhones = await fetch(phonesUrl);
  const phones = await responsePhones.json();

  return phones;
};

export default getData;
