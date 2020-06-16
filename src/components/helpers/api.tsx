const url = 'https://mate-academy.github.io/react_phone-catalog/api/products.json';

const getPhones = (api: string) => {
  return fetch(api)
    .then(response => response.json());
};


export const getPreparedPhones = async () => {
  const phonesFromServer = await getPhones(url);

  return phonesFromServer;
};
