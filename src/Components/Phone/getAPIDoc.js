export const getPhones = async() => {
  const url = 'https://mate-academy.github.io/phone-catalogue-static';
  const response = await fetch(
    `${url}/api/phones.json`
  );

  const currentContent = await response.json();

  return currentContent;
};

export const getDetails = async(phoneId) => {
  const url = `https://mate-academy.github.io/phone-catalogue-static`;
  const response = await fetch(`${url}/api/phones/${phoneId}.json`);
  const data = response.json();

  return data;
};
