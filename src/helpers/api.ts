const API_URL_PRODUCTS = 'https://mate-academy.github.io/react_phone-catalog/api/products.json';

export const getProducts = async () => {
  const responseProductsAPI = await fetch(API_URL_PRODUCTS);
  const productsFromServer = await responseProductsAPI.json();

  return productsFromServer;
};

export const getDetails = async (url: string) => {
  const API_URL_DETAILS = `https://mate-academy.github.io/phone-catalogue-static/api/phones/${url}.json`;
  const responseGadgetDetailsAPI = await fetch(API_URL_DETAILS);
  const detailsFromServer = await responseGadgetDetailsAPI.json();

  return detailsFromServer;
};
