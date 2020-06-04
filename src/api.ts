export const getProducts = async () => {
  const urlProductsAPI = 'https://mate-academy.github.io/react_phone-catalog/api/products.json';
  const responseProductsAPI = await fetch(urlProductsAPI);
  const productsAPI = await responseProductsAPI.json();

  return productsAPI;
};

export const getDetails = async (url: string) => {
  const urlPhoneDetailsAPI = `https://mate-academy.github.io/phone-catalogue-static/api/phones/${url}.json`;
  const responsePhoneDetailsAPI = await fetch(urlPhoneDetailsAPI);
  const getDetailsAPI = await responsePhoneDetailsAPI.json();

  return getDetailsAPI;
};
