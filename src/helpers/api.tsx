const url = 'https://mate-academy.github.io/react_phone-catalog/api/products.json';

const getPhones = (api: string) => {
  return fetch(api )
    .then(response => response.json());
};


export const getDiscountPhones = async () => {
  const phonesFromServer = await getPhones(url);

  return phonesFromServer.filter((item: any): any => item.discount);
};

export const getBrandNewPhones = async () => {
  const phonesFromServer = await getPhones(url);

  return phonesFromServer.sort((a: any, b: any) => a - b);
};

export const getAllPhones = async () => {
  const phonesFromServer = await getPhones(url);

  return phonesFromServer;
};


