const getData = async() => {
  const allPhones
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
  const phoneCalatog = await fetch(allPhones);
  const phones = await phoneCalatog.json();

  return phones;
};

export default getData;
