export const getPhones = async() => {
  const response = await fetch('https://mate-academy.github.io/phone-catalogue-static/api/phones.json');
  const result = await response.json();

  return result;
};

export const getDetails = async(id) => {
  const response = await fetch(`https://mate-academy.github.io/phone-catalogue-static/api/phones/${id}.json`);
  const result = await response.json();

  return result;
};
